import {Injectable} from '@angular/core';
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
  update(gpu: Gpu) {
    return this.afs.collection<Gpu>(this.collectionName).doc(gpu.id).set(gpu);
  }
  delete(id: string) {
    return this.afs.collection<Gpu>(this.collectionName).doc(id).delete();
  }
}

