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
  isLoading = false;

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
    this.isLoading = true;
    this.productService.deleteProduct(id, 'Favorite').subscribe(isLoading => this.isLoading = isLoading);
  }

  redirectToCart() {
    this.router.navigate(['../cart']);
  }
}
