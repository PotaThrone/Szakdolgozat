import {User} from "../user/user";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {Observable} from "rxjs";

export interface Forum {
  id: string;
  date: Timestamp;
  text: string;
  title: string;
  user: User;
  imageLink: Observable<any>;
}
