import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Product} from "./product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName = 'Cart';

  constructor(private afs: AngularFirestore) {
  }
  create(product: Product) {
    return this.afs.collection<Product>(this.collectionName).doc(product.id).set(product);
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
