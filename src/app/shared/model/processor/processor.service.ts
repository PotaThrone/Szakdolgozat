import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Processor} from "./processor";


@Injectable({
  providedIn: 'root'
})
export class ProcessorService {
  collectionName = 'Processor';
  constructor(private afs: AngularFirestore) {
  }
  create(processor: Processor) {
    return this.afs.collection<Processor>(this.collectionName).doc(processor.id).set(processor);
  }

  getAll() {
    return this.afs.collection<Processor>(this.collectionName).valueChanges();
  }

  update(processor: Processor) {
    return this.afs.collection<Processor>(this.collectionName).doc(processor.id).set(processor);
  }

  delete(id: string) {
    return this.afs.collection<Processor>(this.collectionName).doc(id).delete();
  }
}
