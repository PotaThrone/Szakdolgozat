import {Pc} from "../pc/pc";

export interface Game{
  id: string;
  name: string;
  rating: number;
  requirements: Pc;
}
