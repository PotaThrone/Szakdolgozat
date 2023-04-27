import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Game} from "./game";


@Injectable({
  providedIn: 'root'
})
export class GameService {
  collectionName = 'Game';
  constructor(private afs: AngularFirestore) {
  }
  getAll() {
    return this.afs.collection<Game>(this.collectionName).valueChanges();
  }
}
