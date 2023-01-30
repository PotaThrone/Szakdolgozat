import {Component, TemplateRef} from '@angular/core';
import {Product} from "../../shared/model/product/product";
import {ProductService} from "../../shared/model/product/product.service";
import {tap} from "rxjs";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  firstFormGroup = this.formBuilder.group({
    city: ['', Validators.required],
    street: ['', Validators.required],
    postalCode: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    bankCard: ['', Validators.required],
    expireTime: ['', Validators.required],
    cvc: ['', Validators.required],
  });

  modalRef?: BsModalRef;
   products: Product[] = [];
   displayedColumns= ['name', 'description', 'price', 'delete']

   constructor(private productService: ProductService, private modalService: BsModalService, private formBuilder: FormBuilder) {
     this.productService.getAll().pipe(
       tap(products => this.products = products),
     ).subscribe();
   }

  removeFromCart(id: string) {
    this.productService.delete(id);
  }

  openPayingModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-xl'});
  }
}
