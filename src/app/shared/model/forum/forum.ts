import {User} from "../user/user";

export interface Forum {
  id: string;
  date: string;
  text: string;
  title: string;
  user: User;
}
