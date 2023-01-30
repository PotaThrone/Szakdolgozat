import {Component} from '@angular/core';
import {Gpu} from "../../../shared/model/gpu/gpu";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {tap} from "rxjs";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {CartPopupComponent} from "../cart-popup/cart-popup.component";
import {ProductService} from "../../../shared/model/product/product.service";
import {Product} from "../../../shared/model/product/product";

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.scss']
})
export class GpuListComponent {
  bsModalRef?: BsModalRef;
  gpus: Gpu[] = [];

  constructor(private gpuService: GpuService, private modalService: BsModalService, private productService: ProductService) {
    gpuService.getAll().pipe(
      tap(gpus => this.gpus = gpus),
    ).subscribe();
  }

  openCart(gpu: Gpu) {
    gpu.id = 'gpu' + gpu.id;
    this.productService.create(gpu);
    const initialState: ModalOptions = {
      initialState: {
        gpu: gpu,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(CartPopupComponent, initialState);
  }
}
