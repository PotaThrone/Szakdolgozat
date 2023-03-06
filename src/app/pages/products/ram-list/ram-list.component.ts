import { Component } from '@angular/core';
import {tap} from "rxjs";
import {Ram} from "../../../shared/model/ram/ram";
import {RamService} from "../../../shared/model/ram/ram.service";
import {CartService} from "../../cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ram-list',
  templateUrl: './ram-list.component.html',
  styleUrls: ['./ram-list.component.scss']
})
export class RamListComponent {
  rams: Ram[] = [];

  constructor(private ramService: RamService, private cartService: CartService, private snackBar: MatSnackBar) {
    this.ramService.getAll().pipe(
      tap(rams => this.rams = rams),
    ).subscribe();
  }

  openCart(ram: Ram) {
    this.cartService.openCart(ram, 'ram');
  }

  addToFavorites(ram: Ram) {
    this.snackBar.open(ram.brand + ' a kedvencek között!', 'OK');
  }
}
