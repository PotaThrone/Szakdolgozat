import { Component } from '@angular/core';
import {tap} from "rxjs";
import {Motherboard} from "../../../shared/model/motherboard/motherboard";
import {MotherboardService} from "../../../shared/model/motherboard/motherboard.service";
import {CartService} from "../../cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-motherboard-list',
  templateUrl: './motherboard-list.component.html',
  styleUrls: ['./motherboard-list.component.scss']
})
export class MotherboardListComponent {
  motherboards: Motherboard[] = [];

  constructor(private motherboardService: MotherboardService, private cartService: CartService, private snackBar: MatSnackBar) {
   this.motherboardService.getAll().pipe(
     tap(motherboards => this.motherboards = motherboards)
   ).subscribe();
  }

  openCart(motherboard: Motherboard) {
    this.cartService.openCart(motherboard, 'motherboard');
  }

  addToFavorites(motherboard: Motherboard) {
    this.snackBar.open(motherboard.brand + ' a kedvencek között!', 'OK');
  }
}
