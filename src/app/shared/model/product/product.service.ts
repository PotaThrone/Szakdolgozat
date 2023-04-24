import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {LastId, Product, Products, ProductType} from "./product";
import {finalize, map, Observable, Subject, take} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName = 'Cart';
  user = this.authService.getLoggedInUser();

  constructor(private afs: AngularFirestore, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  create(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
  }

  update(product: Product, collectionName: string) {
    return this.afs.collection<any>(collectionName).doc(product.id).set(product);
  }

  delete(id: string) {
    return this.afs.collection<Product>(this.collectionName).doc(id).delete();
  }

  getById(id: string, collectionName: string) {
    return this.afs.collection<any>(collectionName).doc(id).valueChanges();
  }

  getLastId(collectionName: string) {
    return this.afs.collection<LastId>(collectionName).doc('lastId').valueChanges();
  }

  incrementLastId(lastId: number, collectionName: string) {
    const lastIdObj: LastId = {lastId: lastId} as LastId;
    this.afs.collection<LastId>(collectionName).doc('lastId').update(lastIdObj);
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
    const isLoading$ = new Subject<boolean>();
    if (this.user) {
      const favoriteRef = this.getRef(this.user.uid, 'Favorite');

      favoriteRef.valueChanges().pipe(
        map((favorites: any) => favorites?.products || {}),
        finalize(() => isLoading$.next(false)),
        take(1),
      ).subscribe((products: any) => {
        const productAlreadyAdded = !!products[product.id];
        if (!productAlreadyAdded) {
          product.id = productType + product.id;
          favoriteRef.set({products: {...products, [product.id]: product}}, {merge: true})
            .then(() => this.snackBar.open(product.brand + ' a kedvencek között!', 'OK', {
              duration: 2000
            }))
            .catch((error) => console.error('Error adding product:', error))
        }
      });
    }
    return isLoading$.asObservable();
  }

  addProductToCart(product: Product, productType: string): Observable<boolean> {
    const isLoading$ = new Subject<boolean>();
    let productCreatedOrUpdated = false;
    let count: number | undefined = 0;
    if (this.user) {
      const cartRef = this.getRef(this.user.uid, 'Cart');

      cartRef.valueChanges().pipe(
        map((cartProducts: any) => cartProducts?.products || {}),
        take(1)
      ).subscribe((products: any) => {
        let productFromCart: Product;
        if (product.id.includes(productType)) {
          productFromCart = products[product.id];
        } else {
          productFromCart = products[productType + product.id];
        }

        if (productFromCart) {
          count = productFromCart.count;
          if (count && count > 0) {
            productFromCart.count = productFromCart.count + 1;
            if (!productCreatedOrUpdated) {
              cartRef.update({products: products}).finally(() => isLoading$.next(false));
              productCreatedOrUpdated = true;
            }
          }
        } else {
          product.id = productType + product.id;
          product.count = 1;
          if (!productCreatedOrUpdated) {
            cartRef.set({
              products: {
                ...products,
                [product.id]: product
              }
            }, {merge: true}).finally(() => isLoading$.next(false));
            productCreatedOrUpdated = true;
          }
        }
      });
    }
    return isLoading$.asObservable();
  }

  addProductToPc(product: Product, productType: string) {
    const isLoading$ = new Subject<boolean>();

    if (this.user) {
      const pcRef = this.getRef(this.user.uid, 'PC');

      switch (productType) {
        case ProductType.GPU:
          product.id = ProductType.GPU;
          pcRef.update({gpu: product}).finally(() => isLoading$.next(false));
          break;
        case ProductType.HDD:
          product.id = ProductType.HDD;
          pcRef.update({hdd: product}).finally(() => isLoading$.next(false));
          break;
        case ProductType.RAM:
          product.id = ProductType.RAM;
          pcRef.update({ram: product}).finally(() => isLoading$.next(false));
          break;
        case ProductType.PROCESSOR:
          product.id = ProductType.PROCESSOR;
          pcRef.update({processor: product}).finally(() => isLoading$.next(false));
          break;
        case ProductType.MOTHERBOARD:
          product.id = ProductType.MOTHERBOARD;
          pcRef.update({motherboard: product}).finally(() => isLoading$.next(false));
          break;
      }

    }
    return isLoading$.asObservable();
  }

  deleteProduct(productId: string, collectionName: string) {
    if (this.user) {
      const productRef = this.getRef(this.user.uid, collectionName);
      productRef.valueChanges().pipe(
        map((products: any) => products?.products || {}),
        take(1)
      ).subscribe((products: any) => {
        const productFound = !!products[productId];
        if (productFound) {
          if (products[productId].count > 1) {
            products[productId].count = products[productId].count - 1;
          } else {
            delete products[productId];
          }
          productRef.update({products: products}).then(() => console.log("Product deleted"));
        }
      });
    }
  }
}
