import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Gpu} from "./gpu";

@Injectable({
  providedIn: 'root'
})
export class GpuService {

  collectionName = 'GPU';
  constructor(private afs: AngularFirestore) {
  }
  create(gpu: Gpu) {
    return this.afs.collection<Gpu>(this.collectionName).doc(gpu.id).set(gpu);
  }

  getAll() {
    return this.afs.collection<Gpu>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Gpu>(this.collectionName).doc(id).valueChanges();
  }

  getLastId() {
    return this.afs.collection<LastId>(this.collectionName).doc('lastId').valueChanges();
  }

  incrementLastId(lastId: number){
    const lastIdObj: LastId = { lastId: lastId } as LastId;
    this.afs.collection<LastId>(this.collectionName).doc('lastId').set(lastIdObj);
  }
  update(gpu: Gpu) {
    return this.afs.collection<Gpu>(this.collectionName).doc(gpu.id).set(gpu);
  }

  delete(id: string) {
    return this.afs.collection<Gpu>(this.collectionName).doc(id).delete();
  }
}

export interface LastId{
  lastId: number;
}
