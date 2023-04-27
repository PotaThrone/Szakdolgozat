import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Forum} from "./forum";
import {LastId} from "../product/product";

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  collectionName = 'Forum';
  constructor(private afs: AngularFirestore) {
  }
  create(forum: Forum) {
    return this.afs.collection<Forum>(this.collectionName).doc(forum.id).set(forum);
  }

  getAll() {
    return this.afs.collection<Forum>(this.collectionName).valueChanges();
  }
  getLastId() {
    return this.afs.collection<LastId>(this.collectionName).doc('lastId').valueChanges();
  }
  incrementLastId(lastId: number) {
    const lastIdObj: LastId = {lastId: lastId} as LastId;
    this.afs.collection<LastId>(this.collectionName).doc('lastId').update(lastIdObj);
  }

  delete(id: string) {
    return this.afs.collection<Forum>(this.collectionName).doc(id).delete();
  }
}
