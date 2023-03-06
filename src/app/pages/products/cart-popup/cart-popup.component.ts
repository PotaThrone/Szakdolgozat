import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {Product} from "../../../shared/model/product/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.scss'],
})
export class CartPopupComponent {
  product?: Product;

  constructor(public bsModalRef: BsModalRef, private router: Router) {
  }
  redirectToCart() {
    this.router.navigate(['../cart']);
    this.bsModalRef.hide();
  }
}
