import {Component} from '@angular/core';
import {map, tap} from "rxjs";
import {HddService} from "../../../shared/model/hdd/hdd.service";
import {Hdd} from "../../../shared/model/hdd/hdd";
import {CartService} from "../../cart/cart.service";
import {ProductService} from "../../../shared/model/product/product.service";

@Component({
  selector: 'app-hdd-list',
  templateUrl: './hdd-list.component.html',
  styleUrls: ['./hdd-list.component.scss']
})
export class HddListComponent {
  hdds: Hdd[] = [];

  constructor(private hddService: HddService, private cartService: CartService, private productService: ProductService) {
    hddService.getAll().pipe(
      map(hdds => hdds.filter(hdd => hdd.id != null)),
    ).subscribe(hdds => this.hdds = hdds);
  }

  openCart(hdd: Hdd) {
    this.cartService.openCart(hdd, 'hdd');
  }

  addToFavorites(hdd: Hdd) {
    this.productService.addProductToFavorites(hdd, 'hdd');
  }
}
