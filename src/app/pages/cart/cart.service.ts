import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {CartPopupComponent} from "../products/cart-popup/cart-popup.component";
import {ProductService} from "../../shared/model/product/product.service";
import {Product} from "../../shared/model/product/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  bsModalRef?: BsModalRef;

  constructor(private productService: ProductService, private modalService: BsModalService) {
  }

  openCart(product: Product, productType: string): Observable<boolean> {
    const initialState: ModalOptions = {
      initialState: {
        product: product,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(CartPopupComponent, initialState);
    return this.productService.addProductToCart(product, productType);
  }
}
