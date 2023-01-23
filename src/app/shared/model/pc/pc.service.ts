import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Pc} from "./pc";


@Injectable({
  providedIn: 'root'
})
export class PcService {
  collectionName = 'PC';
  constructor(private afs: AngularFirestore) {
  }
  create(pc: Pc) {
    return this.afs.collection<Pc>(this.collectionName).doc(pc.id).set(pc);
  }

  getAll() {
    return this.afs.collection<Pc>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Pc>(this.collectionName).doc(id).valueChanges();
  }

  update(pc: Pc) {
    return this.afs.collection<Pc>(this.collectionName).doc(pc.id).set(pc);
  }

  delete(id: string) {
    return this.afs.collection<Pc>(this.collectionName).doc(id).delete();
  }
}
