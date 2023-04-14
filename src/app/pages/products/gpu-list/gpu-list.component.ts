import {Component} from '@angular/core';
import {Gpu} from "../../../shared/model/gpu/gpu";
import {GpuService} from "../../../shared/model/gpu/gpu.service";
import {tap} from "rxjs";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";

@Component({
  selector: 'app-gpu-list',
  templateUrl: './gpu-list.component.html',
  styleUrls: ['./gpu-list.component.scss']
})
export class GpuListComponent {
  gpus: Gpu[] = [];

  constructor(private gpuService: GpuService, private cartService: CartService, private productService: ProductService) {
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
}
