import { Component } from '@angular/core';
import {Product} from "../../shared/model/product/product";
import {ProductService} from "../../shared/model/product/product.service";
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

  //TODO: Finish the contructor
  constructor(private favoriteService: FavoriteService, private router: Router) {
    this.favoriteService.getFavoritesForUser()?.pipe(
      tap(products => console.log(products)),
    ).subscribe();
  }

  removeFromFavorites(product: Product) {

  }

  redirectToCart() {
    this.router.navigate(['../cart']);
  }
}
