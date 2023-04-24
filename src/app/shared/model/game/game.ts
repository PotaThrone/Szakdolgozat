import {Pc} from "../pc/pc";

export interface Game{
  id: string;
  name: string;
  requirements: Omit<Pc, 'motherboard'>;
}
