import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Forum} from "./forum";

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

  getById(id: string) {
    return this.afs.collection<Forum>(this.collectionName).doc(id).valueChanges();
  }

  update(forum: Forum) {
    return this.afs.collection<Forum>(this.collectionName).doc(forum.id).set(forum);
  }

  delete(id: string) {
    return this.afs.collection<Forum>(this.collectionName).doc(id).delete();
  }
}
