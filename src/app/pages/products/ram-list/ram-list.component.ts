import { Component } from '@angular/core';
import {map} from "rxjs";
import {Ram} from "../../../shared/model/ram/ram";
import {RamService} from "../../../shared/model/ram/ram.service";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {RamEditComponent} from "../ram-edit/ram-edit.component";

@Component({
  selector: 'app-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.scss']
})
export class RamListComponent {
  rams: Ram[] = [];
  bsModalRef?: BsModalRef;

  constructor(private ramService: RamService, private cartService: CartService,  private productService: ProductService,
              private modalService: BsModalService, private router: Router) {
    ramService.getAll().pipe(
      map(rams => rams.filter(ram => ram.id != null)),
    ).subscribe(rams => this.rams = rams);
  }

  openCart(ram: Ram) {
    this.cartService.openCart(ram, 'ram');
  }

  addToFavorites(ram: Ram) {
    this.productService.addProductToFavorites(ram, 'ram');
  }

  openRamEdit(ram: Ram | null) {
    let title = "RAM hozzáadása";
    if(ram){
      title = "RAM módosítása"
    }
    const initialState: ModalOptions = {
      initialState: {
        ram: ram,
        title: title,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(RamEditComponent, initialState);
  }

  navigateToProduct(ram: Ram) {
    this.router.navigate(['../products'], {queryParams: {product: 'ram' + ram.id}});
  }

  delete(ram: Ram) {
    this.ramService.delete(ram.id);
  }
}
