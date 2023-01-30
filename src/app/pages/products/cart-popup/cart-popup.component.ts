import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Gpu} from "../../../shared/model/gpu/gpu";
import {Hdd} from "../../../shared/model/hdd/hdd";
import {Router} from "@angular/router";
import {ProductService} from "../../../shared/model/product/product.service";
import {Product} from "../../../shared/model/product/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss'],
})
export class CartPopupComponent {
  gpu?: Gpu;
  hdd?: Hdd;

  constructor(public bsModalRef: BsModalRef, private router: Router, private productService: ProductService) {
  }

  redirectToCart() {
    this.router.navigate(['../cart']);
    this.bsModalRef.hide();
  }
}
