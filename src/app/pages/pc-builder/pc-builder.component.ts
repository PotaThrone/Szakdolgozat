import {Component, EventEmitter} from '@angular/core';
import {Pc} from "../../shared/model/pc/pc";
import {PcService} from "../../shared/model/pc/pc.service";
import {Product, ProductType} from "../../shared/model/product/product";
import {map, take} from "rxjs";
import {Game} from "../../shared/model/game/game";
import {GameService} from "../../shared/model/game/game.service";
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-pc-builder',
  templateUrl: './pc-builder.component.html',
  styleUrls: ['./pc-builder.component.scss']
})
export class PcBuilderComponent {
  pcComponents: Product[] = [];
  pc!: Pc;
  products = new EventEmitter<Product[]>;
  displayedColumns = ['name', 'price', 'description', 'delete'];
  isLoading = false;
  validPc = false;
  canPcRunGame = false;
  errorMessagePc = '';
  errorMessageGame = '';
  games: Game[] = [];

  constructor(private pcService: PcService, private gameService: GameService, private cartService: CartService) {
    this.isLoading = true;
    this.pcService.getPc()?.pipe(
      take(1))
      ?.subscribe(pc => {
        if (pc) {
          if (pc.gpu) {
            this.pcComponents.push(pc.gpu);
          }
          if (pc.hdd) {
            this.pcComponents.push(pc.hdd);
          }
          if (pc.ram) {
            this.pcComponents.push(pc.ram);
          }
          if (pc.motherboard) {
            this.pcComponents.push(pc.motherboard);
          }
          if (pc.processor) {
            this.pcComponents.push(pc.processor);
          }
          this.pc = pc;
        }
        this.products.next(this.pcComponents);
        this.isLoading = false;
      });
    this.gameService.getAll().pipe(
      take(1),
      map(games => games.sort((game1, game2) => game1.name.localeCompare(game2.name))),
    ).subscribe(games => {
      this.games = games;
      this.isLoading = false;
    });
  }

  private createPc(pcComponents: Product[]): Pc {
    const pc: Pc = {
      gpu: pcComponents.find(pcComponent => pcComponent.id.includes(ProductType.GPU)) ? this.pc.gpu : null,
      hdd: pcComponents.find(pcComponent => pcComponent.id.includes(ProductType.HDD)) ? this.pc.hdd : null,
      ram: pcComponents.find(pcComponent => pcComponent.id.includes(ProductType.RAM)) ? this.pc.ram : null,
      motherboard: pcComponents.find(pcComponent => pcComponent.id.includes(ProductType.MOTHERBOARD)) ? this.pc.motherboard : null,
      processor: pcComponents.find(pcComponent => pcComponent.id.includes(ProductType.PROCESSOR)) ? this.pc.processor : null,
    }
    this.pc = pc;
    return pc;
  }

  removeFromPc(product: Product) {
    this.isLoading = true;
    const pcFiltered = this.pcComponents.filter(pcComponent => pcComponent.id !== product.id);
    this.pcService.update(this.createPc(pcFiltered))?.finally(() => this.isLoading = false);
    this.pcComponents = pcFiltered;
    this.validPc = false;
    this.canPcRunGame = false;
    this.errorMessagePc = '';
    this.errorMessageGame = '';
    this.products.next(pcFiltered);
  }

  getTotalPrice(): number {
    let total = 0;
    this.pcComponents.forEach(product => total += product.price);
    return total;
  }

  checkPc() {
    this.validPc = true;
    this.errorMessagePc = "";
    let missingComponent = false;
    if (!this.pc.motherboard) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessagePc += 'Hiányzik az alaplap!\n';
    }
    if (!this.pc.gpu) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessagePc += 'Hiányzik a videókártya!\n';
    }
    if (!this.pc.processor) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessagePc += 'Hiányzik a processzor!\n';
    }
    if (!this.pc.hdd) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessagePc += 'Hiányzik a merevlemez!\n';
    }
    if (!this.pc.ram) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessagePc += 'Hiányzik a RAM!\n';
    }
    if (!missingComponent) {
      if (this.pc.motherboard?.chipset !== this.pc.processor?.chipset) {
        this.validPc = false;
        this.errorMessagePc += `A ${this.pc.processor?.brand} (${this.pc.processor?.chipset}) nem kompatibilis a(z) ${this.pc.motherboard?.brand}-vel (${this.pc.motherboard?.chipset})!\n`;
      }
      if (this.pc.motherboard?.ramSlots !== this.pc.ram?.slot) {
        this.validPc = false;
        this.errorMessagePc += `A ${this.pc.ram?.brand} (${this.pc.ram?.slot}) nem kompatibilis a(z) ${this.pc.motherboard?.brand}-vel (${this.pc.motherboard?.ramSlots})!\n`;
      }
      if (this.pc.motherboard?.hddCable !== this.pc.hdd?.cableType) {
        this.validPc = false;
        this.errorMessagePc += `A ${this.pc.hdd?.brand} (${this.pc.hdd?.cableType}) nem köthető be a(z) ${this.pc.motherboard?.brand}-vel (${this.pc.motherboard?.hddCable})!\n`;
      }
      if (this.pc.motherboard?.gpuSlots !== this.pc.gpu?.slot) {
        this.validPc = false;
        this.errorMessagePc += `A ${this.pc.gpu?.brand} (${this.pc.gpu?.slot}) nem kompatibilis a(z) ${this.pc.motherboard?.brand}-vel (${this.pc.motherboard?.gpuSlots})!\n`;
      }
    }
  }

  checkGame(game: Game, event: any) {
    if(event.isUserInput){
      this.canPcRunGame = true;
      this.errorMessageGame = '';
      if(this.pc.gpu!.clock < game.requirements.gpuClock){
        this.canPcRunGame = false;
        this.errorMessageGame += 'Nincs elég gyors a videókártya!\n';
      }
      if(this.pc.hdd!.size < game.requirements.hddSpace){
        this.canPcRunGame = false;
        this.errorMessageGame += 'Nincs elég tárhely a merevlemezen!\n';
      }
      if(this.pc.ram!.memorySize < game.requirements.ramMemory){
        this.canPcRunGame = false;
        this.errorMessageGame += 'Nincs elég memória a RAM-ban!\n';
      }
      if(this.pc.processor!.core < game.requirements.cpuCore){
        this.canPcRunGame = false;
        this.errorMessageGame += 'Nincs elég mag a processzorban!\n';
      }
    }
  }


  addToCart(product: Product) {
    this.isLoading = true;
    if (product.id.includes(ProductType.HDD)) {
      this.cartService.openCart(product, ProductType.HDD).subscribe(isLoading => {
        take(1);
        this.isLoading = isLoading;
      });
      return;
    }
    if (product.id.includes(ProductType.GPU)) {
      this.cartService.openCart(product, ProductType.GPU).subscribe(isLoading => {
        take(1);
        this.isLoading = isLoading;
      });
      return;
    }
    if (product.id.includes(ProductType.PROCESSOR)) {
      this.cartService.openCart(product, ProductType.PROCESSOR).subscribe(isLoading => {
        take(1);
        this.isLoading = isLoading;
      });
      return;
    }
    if (product.id.includes(ProductType.MOTHERBOARD)) {
      this.cartService.openCart(product, ProductType.MOTHERBOARD).subscribe(isLoading => {
        take(1);
        this.isLoading = isLoading;
      });
      return;
    }
    if (product.id.includes(ProductType.RAM)) {
      this.cartService.openCart(product, ProductType.RAM).subscribe(isLoading => {
        take(1);
        this.isLoading = isLoading;
      });
    }
  }

  // addPcToCart() {
  //   this.isLoading = true;
  //   forkJoin(
  //     this.productService.addProductToCart(this.pc.ram!, ProductType.RAM).pipe(take(1)),
  //     this.productService.addProductToCart(this.pc.gpu!, ProductType.GPU).pipe(take(1)),
  //     this.productService.addProductToCart(this.pc.motherboard!, ProductType.MOTHERBOARD).pipe(take(1)),
  //     this.productService.addProductToCart(this.pc.processor!, ProductType.PROCESSOR).pipe(take(1)),
  //     this.productService.addProductToCart(this.pc.hdd!, ProductType.HDD).pipe(take(1))).subscribe(
  //     ([isLoading]) => this.isLoading = isLoading);
  // }
}
