import {Component} from '@angular/core';
import {tap} from "rxjs";
import {HddService} from "../../../shared/model/hdd/hdd.service";
import {Hdd} from "../../../shared/model/hdd/hdd";
import {CartService} from "../../cart/cart.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-hdd-list',
  templateUrl: './hdd-list.component.html',
  styleUrls: ['./hdd-list.component.scss']
})
export class HddListComponent {
  hdds: Hdd[] = [];

  constructor(private hddService: HddService, private cartService: CartService, private snackBar: MatSnackBar) {
    this.hddService.getAll().pipe(
      tap(hdds => this.hdds = hdds),
    ).subscribe();
  }

  openCart(hdd: Hdd) {
    this.cartService.openCart(hdd, 'hdd');
  }

  addToFavorites(hdd: Hdd) {
    this.snackBar.open(hdd.brand + ' a kedvencek között!', 'OK');
  }
}
