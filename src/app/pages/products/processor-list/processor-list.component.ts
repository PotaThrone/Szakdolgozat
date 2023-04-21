import {Component, Input} from '@angular/core';
import {map} from "rxjs";
import {ProcessorService} from "../../../shared/model/processor/processor.service";
import {Processor} from "../../../shared/model/processor/processor";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {ProcessorEditComponent} from "../processor-edit/processor-edit.component";
import {ProductType} from "../../../shared/model/product/product";

@Component({
  selector: 'app-processor-list',
  templateUrl: './processor-list.component.html',
  styleUrls: ['./processor-list.component.scss']
})
export class ProcessorListComponent {
  @Input()
  processors: Processor[] = [];
  bsModalRef?: BsModalRef;
  constructor(private processorService: ProcessorService, private cartService: CartService,  private productService: ProductService,
              private modalService: BsModalService, private router: Router) {}

  openCart(processor: Processor) {
    this.cartService.openCart(processor, ProductType.PROCESSOR);
  }

  addToFavorites(processor: Processor) {
    this.productService.addProductToFavorites(processor, ProductType.PROCESSOR)
  }

  openProcessorEdit(processor: Processor | null) {
    let title = "Processzor hozzáadása";
    if(processor){
      title = "Processzor módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        processor: processor,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(ProcessorEditComponent, initialState);
  }

  navigateToProduct(processor: Processor) {
    this.router.navigate(['../products'], {queryParams: {product: ProductType.PROCESSOR + processor.id}});
  }

  delete(processor: Processor) {
    this.processorService.delete(processor.id);
  }
}
