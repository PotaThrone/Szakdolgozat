import {Component, TemplateRef} from '@angular/core';
import {Product} from "../../shared/model/product/product";
import {ProductService} from "../../shared/model/product/product.service";
import {tap} from "rxjs";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
   products: Product[] = [];
   displayedColumns= ['name', 'description', 'price', 'delete']

   constructor(private productService: ProductService, private modalService: BsModalService) {
     this.productService.getAll().pipe(
       tap(products => this.products = products),
     ).subscribe();
   }

  removeFromCart(id: string) {
    this.productService.delete(id);
  }

  openPayingModal(template: TemplateRef<any>) {
    this.modalService.show(template);
  }
}
