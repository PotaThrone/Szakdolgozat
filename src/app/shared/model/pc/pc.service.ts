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

  user = this.authService.getLoggedInUser();

  constructor(private afs: AngularFirestore, private authService: AuthService) {
  }


  getAll() {
    return this.afs.collection<Pc>(this.collectionName).valueChanges();
  }

  getPc() {
    if (this.user) {
      return this.afs.collection<Pc>(this.collectionName).doc(this.user.uid).valueChanges();
    }
    return null;
  }

  getPcAny() {
    if (this.user) {
      return this.afs.collection<any>(this.collectionName).doc(this.user.uid).valueChanges();
    }
    return null;
  }

  update(pc: Pc) {
    if (this.user) {
      return this.afs.collection<Pc>(this.collectionName).doc(this.user.uid).update(pc);
    }
    return null;
  }
}
