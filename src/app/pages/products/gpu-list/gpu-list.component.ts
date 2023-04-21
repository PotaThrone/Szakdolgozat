import {Component, Input} from '@angular/core';
import {Gpu} from "../../../shared/model/gpu/gpu";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {GpuEditComponent} from "../gpu-edit/gpu-edit.component";
import {Router} from "@angular/router";
import {ProductType} from "../../../shared/model/product/product";

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.scss']
})
export class GpuListComponent {

  @Input()
  gpus: Gpu[] = [];
  bsModalRef?: BsModalRef;

  constructor(private gpuService: GpuService, private cartService: CartService, private productService: ProductService,
              private modalService: BsModalService, private router: Router) {
  }

  openCart(gpu: Gpu) {
    this.cartService.openCart(gpu, 'gpu');
  }

  addToFavorites(gpu: Gpu) {
    this.productService.addProductToFavorites(gpu, 'gpu');
  }

  openGpuEdit(gpu: Gpu | null) {
    let title = "Videokártya hozzáadása";
    if(gpu){
      title = "Videokártya módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        gpu: gpu,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(GpuEditComponent, initialState);
  }

  navigateToProduct(gpu: Gpu) {
    this.router.navigate(['../products'], {queryParams: {product: ProductType.GPU + gpu.id}});
  }

  delete(gpu: Gpu) {
    this.gpuService.delete(gpu.id);
  }
}
