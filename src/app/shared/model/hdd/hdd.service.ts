import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Hdd} from "./hdd";


@Injectable({
  providedIn: 'root'
})
export class HddService {
  collectionName = 'HDD';

  constructor(private afs: AngularFirestore) {
  }

  create(hdd: Hdd) {
    return this.afs.collection<Hdd>(this.collectionName).doc(hdd.id).set(hdd);
  }

  getAll() {
    return this.afs.collection<Hdd>(this.collectionName).valueChanges();
  }

  update(hdd: Hdd) {
    return this.afs.collection<Hdd>(this.collectionName).doc(hdd.id).set(hdd);
  }

  delete(id: string) {
    return this.afs.collection<Hdd>(this.collectionName).doc(id).delete();
  }
}
