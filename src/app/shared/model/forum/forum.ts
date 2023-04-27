import {User} from "../user/user";
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
