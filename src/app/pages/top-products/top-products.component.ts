import {Component, EventEmitter} from '@angular/core';
import {Product, ProductType} from "../../shared/model/product/product";
import {GpuService} from "../../shared/model/gpu/gpu.service";
import {HddService} from "../../shared/model/hdd/hdd.service";
import {ProcessorService} from "../../shared/model/processor/processor.service";
import {MotherboardService} from "../../shared/model/motherboard/motherboard.service";
import {RamService} from "../../shared/model/ram/ram.service";
import {forkJoin, map, take} from "rxjs";
import {getProductUrl, showProductType} from "../products/products.component";

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss']
})
export class TopProductsComponent {
  productsEvent = new EventEmitter<Product[]>;
  displayedColumns = ['productType', 'name', 'price', 'rating']
  isLoading = false;

  constructor(private gpuService: GpuService, private hddService: HddService, private processorService: ProcessorService, private motherboardService: MotherboardService,
              private ramService: RamService) {
    this.isLoading = true;
    forkJoin(
      this.gpuService.getAll().pipe(
        map(gpus => gpus.sort((gpu1, gpu2) => gpu2.rating - gpu1.rating)),
        map(gpus => gpus.slice(0, 3)),
        map(gpus => gpus.map(gpu => ({...gpu, id: ProductType.GPU + gpu.id}))),
        take(1),
      ),
      this.hddService.getAll().pipe(
        map(hdds => hdds.sort((hdd1, hdd2) => hdd2.rating - hdd1.rating)),
        map(hdds => hdds.slice(0, 3)),
        map(hdds => hdds.map(hdd => ({...hdd, id: ProductType.HDD + hdd.id}))),
        take(1),
      ),
      this.processorService.getAll().pipe(
        map(processors => processors.sort((processor1, processor2) => processor2.rating - processor1.rating)),
        map(processors => processors.slice(0, 3)),
        map(processors => processors.map(processor => ({...processor, id: ProductType.PROCESSOR + processor.id}))),
        take(1),
      ),
      this.motherboardService.getAll().pipe(
        map(motherboards => motherboards.sort((motherboard1, motherboard2) => motherboard2.rating - motherboard1.rating)),
        map(motherboards => motherboards.slice(0, 3)),
        map(motherboards => motherboards.map(motherboard => ({...motherboard, id: ProductType.MOTHERBOARD + motherboard.id}))),
        take(1),
      ),
      this.ramService.getAll().pipe(
        map(rams => rams.sort((ram1, ram2) => ram2.rating - ram1.rating)),
        map(rams => rams.slice(0, 3)),
        map(rams => rams.map(ram => ({...ram, id: ProductType.RAM + ram.id}))),
        take(1),
      )
    ).subscribe(([gpus, hdds, processors, motherboards, rams]) => {
        let products = [...gpus, ...hdds, ...processors, ...motherboards, ...rams].sort(
          (product1, product2) => product2.rating - product1.rating);
        this.productsEvent.next(products);
        this.isLoading = false;
      },
    );
  }

  protected readonly getProductUrl = getProductUrl;
  protected readonly showProductType = showProductType;
}
