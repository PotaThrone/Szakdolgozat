import {Component} from '@angular/core';
import {map} from "rxjs";
import {ProcessorService} from "../../../shared/model/processor/processor.service";
import {Processor} from "../../../shared/model/processor/processor";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {ProcessorEditComponent} from "../processor-edit/processor-edit.component";

@Component({
  selector: 'app-processor-list',
  templateUrl: './processor-list.component.html',
  styleUrls: ['./processor-list.component.scss']
})
export class ProcessorListComponent {
  processors: Processor[] = [];
  bsModalRef?: BsModalRef;
  constructor(private processorService: ProcessorService, private cartService: CartService,  private productService: ProductService,
              private modalService: BsModalService, private router: Router) {
    processorService.getAll().pipe(
      map(processors => processors.filter(processor => processor.id != null)),
    ).subscribe(processors => this.processors = processors);
  }

  openCart(processor: Processor) {
    this.cartService.openCart(processor, 'processor');
  }

  addToFavorites(processor: Processor) {
    this.productService.addProductToFavorites(processor, 'proccessor')
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
    this.router.navigate(['../products'], {queryParams: {product: 'processor' + processor.id}});
  }

  delete(processor: Processor) {
    this.processorService.delete(processor.id);
  }
}
