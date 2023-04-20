import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Motherboard} from "./motherboard";
import {LastId} from "../product/product";

@Injectable({
  providedIn: 'root'
})
export class MotherboardService {
  collectionName = 'Motherboard';
  constructor(private afs: AngularFirestore) {
  }
  create(motherboard: Motherboard) {
    return this.afs.collection<Motherboard>(this.collectionName).doc(motherboard.id).set(motherboard);
  }

  getAll() {
    return this.afs.collection<Motherboard>(this.collectionName).valueChanges();
  }

  update(motherboard: Motherboard) {
    return this.afs.collection<Motherboard>(this.collectionName).doc(motherboard.id).set(motherboard);
  }

  delete(id: string) {
    return this.afs.collection<Motherboard>(this.collectionName).doc(id).delete();
  }
}
