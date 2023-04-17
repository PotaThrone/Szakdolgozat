import {Component} from '@angular/core';
import {Gpu} from "../../../shared/model/gpu/gpu";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {tap} from "rxjs";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {CartPopupComponent} from "../cart-popup/cart-popup.component";
import {Product} from "../../../shared/model/product/product";
import {GpuEditComponent} from "../gpu-edit/gpu-edit.component";

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.scss']
})
export class GpuListComponent {
  gpus: Gpu[] = [];
  bsModalRef?: BsModalRef;

  constructor(private gpuService: GpuService, private cartService: CartService, private productService: ProductService, private modalService: BsModalService) {
    gpuService.getAll().pipe(
      tap(gpus => this.gpus = gpus),
    ).subscribe();
  }

  openCart(gpu: Gpu) {
    this.cartService.openCart(gpu, 'gpu');
  }

  addToFavorites(gpu: Gpu) {
    this.productService.addProductToFavorites(gpu, 'gpu');
  }

  openGpuEdit(product: Product | null) {
    const initialState: ModalOptions = {
      initialState: {
        product: product,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(GpuEditComponent, initialState);
  }
}
