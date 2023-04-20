import { Component } from '@angular/core';
import {map} from "rxjs";
import {Motherboard} from "../../../shared/model/motherboard/motherboard";
import {MotherboardService} from "../../../shared/model/motherboard/motherboard.service";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {MotherboardEditComponent} from "../motherboard-edit/motherboard-edit.component";

@Component({
  selector: 'app-motherboard-list',
  templateUrl: './motherboard-list.component.html',
  styleUrls: ['./motherboard-list.component.scss']
})
export class MotherboardListComponent {
  motherboards: Motherboard[] = [];
  bsModalRef?: BsModalRef;

  constructor(private motherboardService: MotherboardService, private cartService: CartService, private productService: ProductService,
              private modalService: BsModalService, private router: Router) {
    motherboardService.getAll().pipe(
      map(motherboards => motherboards.filter(motherboard => motherboard.id != null)),
    ).subscribe(motherboards => this.motherboards = motherboards);
  }

  openCart(motherboard: Motherboard) {
    this.cartService.openCart(motherboard, 'motherboard');
  }

  addToFavorites(motherboard: Motherboard) {
    this.productService.addProductToFavorites(motherboard, 'motherboard');
  }

  openMotherboardEdit(motherboard: Motherboard | null) {
    let title = "Alaplap hozzáadása";
    if(motherboard){
      title = "Alaplap módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        motherboard: motherboard,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(MotherboardEditComponent, initialState);
  }

  navigateToProduct(motherboard: Motherboard) {
    this.router.navigate(['../products'], {queryParams: {product: 'motherboard' + motherboard.id}});
  }

  delete(motherboard: Motherboard) {
     this.motherboardService.delete(motherboard.id);
  }
}
