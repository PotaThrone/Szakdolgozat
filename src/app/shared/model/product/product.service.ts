import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {LastId, Product} from "./product";
import {Products} from "../../../pages/favorite/favorite.component";
import {map, take} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName = 'Cart';

  constructor(private afs: AngularFirestore, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  create(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
  }

  getAll() {
    return this.afs.collection<Product>(this.collectionName).valueChanges();
  }
  update(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
  }

  delete(id: string) {
    return this.afs.collection<Product>(this.collectionName).doc(id).delete();
  }

  getLastId(collectionName: string) {
    return this.afs.collection<LastId>(collectionName).doc('lastId').valueChanges();
  }

  incrementLastId(lastId: number, collectionName: string){
    const lastIdObj: LastId = { lastId: lastId } as LastId;
    this.afs.collection<LastId>(collectionName).doc('lastId').set(lastIdObj);
  }

  private getRef(userId: string, collectionName: string) {
    return this.afs.collection(collectionName).doc(userId);
  }
  getProducts(collectionName: string) {
    let user = this.authService.getLoggedInUser();
    if (user) {
      return this.afs.collection<Products>(collectionName).doc(user.uid).valueChanges();
    }
    return null;
  }

  addProductToFavorites(product: Product, productType: string) {
    let user = this.authService.getLoggedInUser();
    if (user) {
      const productRef = this.getRef(user.uid, 'Favorite');

      productRef.valueChanges().pipe(
        map((favorites: any) => favorites?.products || {}),
        take(1)
      ).subscribe((products: any) => {
        const productAlreadyAdded = !!products[product.id];
        if (!productAlreadyAdded) {
          product.id = productType + product.id;
          productRef.set({products: {...products, [product.id]: product}}, {merge: true})
            .then(() => this.snackBar.open(product.brand + ' a kedvencek között!', 'OK'))
            .catch((error) => console.error('Error adding product:', error))
        }
      });
    }
  }

  addProductToCart(product: Product, productType: string) {
    let user = this.authService.getLoggedInUser();
    let productCreatedOrUpdated = false;
    let count: number | undefined = 0;
    if (user) {
      const productRef = this.getRef(user.uid, 'Cart');

      productRef.valueChanges().pipe(
        map((favorites: any) => favorites?.products || {}),
        take(1)
      ).subscribe((products: any) => {
        const productFromCart = products[product.id];
        if(productFromCart){
          count = productFromCart.count;
          if (count && count > 0) {
            productFromCart.count = productFromCart.count + 1;
            if (!productCreatedOrUpdated) {
              productRef.update({products: products});
              productCreatedOrUpdated = true;
            }
          }
        }else{
          product.id = productType + product.id;
          product.count = 1;
          if (!productCreatedOrUpdated) {
            productRef.set({products: {...products, [product.id]: product}}, {merge: true});
            productCreatedOrUpdated = true;
          }
        }
      });
    }
  }

  deleteProduct(productId: string, collectionName: string) {
    let user = this.authService.getLoggedInUser();
    if (user) {
      const productRef = this.getRef(user.uid, collectionName);
      productRef.valueChanges().pipe(
        map((favorites: any) => favorites?.products || {}),
        take(1)
      ).subscribe((products: any) => {
        const productFound = !!products[productId];
        if (productFound) {
          delete products[productId];
          productRef.update({products: products}).then(() => console.log("Product deleted"));
        }
      });
    }
  }
}
