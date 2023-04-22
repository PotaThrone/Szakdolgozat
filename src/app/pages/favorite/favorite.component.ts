import {Component} from '@angular/core';
import {Product} from "../../shared/model/product/product";
import {tap} from "rxjs";
import {Router} from "@angular/router";
import {ProductService} from "../../shared/model/product/product.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  products: Product[] = [];

  displayedColumns = ['name', 'description', 'price', 'delete']

  constructor(private router: Router, private productService: ProductService) {
    this.productService.getProducts('Favorite')?.pipe(
      tap(products => {
        if (products) {
          const productArray = Object.values(products);
          this.products = Object.values(productArray[0]);
          this.products.sort((product1, product2) => product1.brand.localeCompare(product2.brand));
        } else {
          this.products = [];
        }
      }),
    ).subscribe();
  }

  removeFromFavorites(id: string) {
    this.productService.deleteProduct(id, 'Favorite');
  }

  redirectToCart() {
    this.router.navigate(['../cart']);
  }
}
