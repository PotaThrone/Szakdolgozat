import {User} from "../user/user";

export interface Forum {
  id: string;
  date: Date;
  text: string;
  title: string;
  user: User;
}
