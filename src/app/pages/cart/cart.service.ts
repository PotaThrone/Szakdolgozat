import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {CartPopupComponent} from "../products/cart-popup/cart-popup.component";
import {ProductService} from "../../shared/model/product/product.service";
import {Product} from "../../shared/model/product/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  bsModalRef?: BsModalRef;

  constructor(private productService: ProductService, private modalService: BsModalService) {
  }

  openCart(product: Product, productType: string) {
    let productCreatedOrUpdated = false;
    let count: number | undefined = 0;
    this.productService.getById(productType + product.id).subscribe(
      (productFromService) => {
        count = productFromService?.count;
        if (count && count > 0 && productFromService) {
          product.count = count + 1;
          product.id = <string>productFromService.id;
          if (!productCreatedOrUpdated) {
            this.productService.update(product);
            productCreatedOrUpdated = true;
          }
        } else {
          product.id = productType + product.id;
          product.count = 1;
          if (!productCreatedOrUpdated) {
            this.productService.create(product);
            productCreatedOrUpdated = true;
          }
        }
      }
    );
    const initialState: ModalOptions = {
      initialState: {
        product: product,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(CartPopupComponent, initialState);
  }
}
