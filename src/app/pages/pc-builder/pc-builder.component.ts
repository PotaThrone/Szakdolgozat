import {Component, EventEmitter} from '@angular/core';
import {Pc} from "../../shared/model/pc/pc";
import {PcService} from "../../shared/model/pc/pc.service";
import {Product, ProductType} from "../../shared/model/product/product";
import {take} from "rxjs";

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
  validPc = true;
  errorMessage = "";

  constructor(private pcService: PcService) {
    this.isLoading = true;
    this.pcService.getPc()?.pipe(
      take(1),)
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
    this.products.next(pcFiltered);
  }

  getTotalPrice(): number {
    let total = 0;
    return total;
  }

  checkPc() {
    this.errorMessage = "";
    let missingComponent = false;
    if (!this.pc.motherboard) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessage += 'Hiányzik az alaplap!\n';
    }
    if (!this.pc.gpu) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessage += 'Hiányzik a videókártya!\n';
    }
    if (!this.pc.processor) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessage += 'Hiányzik a processzor!\n';
    }
    if (!this.pc.hdd) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessage += 'Hiányzik a merevlemez!\n';
    }
    if (!this.pc.ram) {
      this.validPc = false;
      missingComponent = true;
      this.errorMessage += 'Hiányzik a RAM!\n';
    }
    if (!missingComponent) {
      if (this.pc.motherboard?.chipset !== this.pc.processor?.chipset) {
        this.validPc = false;
        this.errorMessage += `A ${this.pc.processor?.brand} (${this.pc.processor?.chipset}) nem kompatibilis a(z) ${this.pc.motherboard?.brand}-vel (${this.pc.motherboard?.chipset})!\n`;
      }
      if (this.pc.motherboard?.ramSlots !== this.pc.ram?.slot) {
        this.validPc = false;
        this.errorMessage += `A ${this.pc.ram?.brand} (${this.pc.ram?.slot}) nem kompatibilis a(z) ${this.pc.motherboard?.brand}-vel (${this.pc.motherboard?.ramSlots})!\n`;
      }
      if (this.pc.motherboard?.hddCable !== this.pc.hdd?.cableType) {
        this.validPc = false;
        this.errorMessage += `A ${this.pc.hdd?.brand} (${this.pc.hdd?.cableType}) nem köthető be a(z) ${this.pc.motherboard?.brand}-vel (${this.pc.motherboard?.hddCable})!\n `;
      }
      if (this.pc.motherboard?.gpuSlots !== this.pc.gpu?.slot) {
        this.validPc = false;
        this.errorMessage += `A ${this.pc.gpu?.brand} (${this.pc.gpu?.slot}) nem kompatibilis a(z) ${this.pc.motherboard?.brand}-vel (${this.pc.motherboard?.gpuSlots})!\n `;
      }
    }
  }
}
