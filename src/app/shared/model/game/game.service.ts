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
  create(game: Game) {
    return this.afs.collection<Game>(this.collectionName).doc(game.id).set(game);
  }

  getAll() {
    return this.afs.collection<Game>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Game>(this.collectionName).doc(id).valueChanges();
  }

  update(game: Game) {
    return this.afs.collection<Game>(this.collectionName).doc(game.id).set(game);
  }

  delete(id: string) {
    return this.afs.collection<Game>(this.collectionName).doc(id).delete();
  }
}
