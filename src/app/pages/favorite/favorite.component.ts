import {Component} from '@angular/core';
import {Product} from "../../shared/model/product/product";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {FavoriteService} from "./favorite.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  products: Product[] = [];

  displayedColumns = ['name', 'description', 'price', 'delete']

  constructor(private favoriteService: FavoriteService, private router: Router) {
    this.favoriteService.getFavoritesForUser()?.pipe(
      tap(products => {
        if (products) {
          const productArray = Object.values(products);
          this.products = Object.values(productArray[0]);
        } else {
          this.products = [];
        }
      }),
    ).subscribe();
  }

  //TODO: implement delete from user in favoriteService
  removeFromFavorites(product: Product) {

  }

  redirectToCart() {
    this.router.navigate(['../cart']);
  }
}

export interface Products {
  [key: string]: Product;
}
