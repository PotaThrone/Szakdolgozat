import {Component} from '@angular/core';
import {tap} from "rxjs";
import {ProcessorService} from "../../../shared/model/processor/processor.service";
import {Processor} from "../../../shared/model/processor/processor";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";

@Component({
  selector: 'app-processor-list',
  templateUrl: './processor-list.component.html',
  styleUrls: ['./processor-list.component.scss']
})
export class ProcessorListComponent {
  processors: Processor[] = [];

  constructor(private processorService: ProcessorService, private cartService: CartService,  private productService: ProductService) {
    this.processorService.getAll().pipe(
      tap(processors => this.processors = processors),
    ).subscribe();
  }

  openCart(processor: Processor) {
    this.cartService.openCart(processor, 'processor');
  }

  addToFavorites(processor: Processor) {
    this.productService.addProductToFavorites(processor, 'proccessor')
  }
}
