import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Pc} from "./pc";
import {Product, Products} from "../product/product";
import {AuthService} from "../../auth/auth.service";
import {finalize, map, Subject, take} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PcService {
  collectionName = 'PC';

  constructor(private afs: AngularFirestore, private authService: AuthService) {
  }

  getAll() {
    return this.afs.collection<Pc>(this.collectionName).valueChanges();
  }

  createEmptyPc(){
    let user = this.authService.getLoggedInUser();
    if (user) {
      let pc: Pc = {
        ram: null,
        gpu: null,
        processor: null,
        hdd: null,
        motherboard: null,
      }
      this.afs.collection<Pc>(this.collectionName).doc(user.uid).set(pc);
    }
    return null;
  }

  getPc() {
    let user = this.authService.getLoggedInUser();
    if (user) {
      return this.afs.collection<Pc>(this.collectionName).doc(user.uid).valueChanges();
    }
    return null;
  }

  update(pc: Pc) {
    let user = this.authService.getLoggedInUser();
    if (user) {
      return this.afs.collection<Pc>(this.collectionName).doc(user.uid).update(pc);
    }
    return null;
  }
}
