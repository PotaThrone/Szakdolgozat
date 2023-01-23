import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Ram} from "./ram";


@Injectable({
  providedIn: 'root'
})
export class RamService {
  collectionName = 'Processor';
  constructor(private afs: AngularFirestore) {
  }
  create(ram: Ram) {
    return this.afs.collection<Ram>(this.collectionName).doc(ram.id).set(ram);
  }

  getAll() {
    return this.afs.collection<Ram>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Ram>(this.collectionName).doc(id).valueChanges();
  }

  update(ram: Ram) {
    return this.afs.collection<Ram>(this.collectionName).doc(ram.id).set(ram);
  }

  delete(id: string) {
    return this.afs.collection<Ram>(this.collectionName).doc(id).delete();
  }
}
