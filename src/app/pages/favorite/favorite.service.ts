import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Product} from "../../shared/model/product/product";
import {User} from "../../shared/model/user/user";
import {map} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../shared/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  collectionName = 'Favorite';
  constructor(private afs: AngularFirestore, private snackBar: MatSnackBar, private authService: AuthService) {
  }
  create(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
  }
  getRef(userId: string){
    return this.afs.collection(this.collectionName).doc(userId);
  }
  getFavoritesForUser(){
    let user = this.authService.getLoggedInUser();
    if (user) {
      return this.afs.collection<Product[]>(this.collectionName).doc(user.uid).valueChanges();
    }
    return null;
  }

  addToFavorites(product: Product, productType: string){
    let user = this.authService.getLoggedInUser();
    if (user) {
      const favoritesRef = this.getRef(user.uid);

      favoritesRef.valueChanges().pipe(
        map((favorites: any) => favorites?.products || {})
      ).subscribe((products: any) => {
        const productAlreadyAdded = !!products[productType + product.id];
        if (!productAlreadyAdded) {
          favoritesRef.set({products: {...products, [productType + product.id]: product}}, {merge: true})
            .then(() =>  this.snackBar.open(product.brand + ' a kedvencek között!', 'OK'))
            .catch((error) => console.error('Error adding product to favorites:', error))
        }
      });
    }
  }

  getAll() {
    return this.afs.collection<Product>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Product>(this.collectionName).doc(id).valueChanges();
  }

  update(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
  }

  delete(id: string) {
    return this.afs.collection<Product>(this.collectionName).doc(id).delete();
  }
}
