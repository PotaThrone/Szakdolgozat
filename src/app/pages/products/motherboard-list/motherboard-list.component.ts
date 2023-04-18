import { Component } from '@angular/core';
import {map, tap} from "rxjs";
import {Motherboard} from "../../../shared/model/motherboard/motherboard";
import {MotherboardService} from "../../../shared/model/motherboard/motherboard.service";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";

@Component({
  selector: 'app-motherboard-list',
  templateUrl: './motherboard-list.component.html',
  styleUrls: ['./motherboard-list.component.scss']
})
export class MotherboardListComponent {
  motherboards: Motherboard[] = [];

  constructor(private motherboardService: MotherboardService, private cartService: CartService, private productService: ProductService) {
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
}
