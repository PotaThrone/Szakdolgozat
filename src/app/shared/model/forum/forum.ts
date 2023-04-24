import {User} from "../user/user";
import firebase from "firebase/compat";
import {Observable} from "rxjs";
import {Game} from "../game/game";

export interface Forum {
  id: string;
  date: Date;
  text: string;
  game: Game;
  user: User;
  rating: number;
  imageLink: Observable<any>;
}
