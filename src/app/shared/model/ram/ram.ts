import {Product} from "../product/product";

export interface Ram extends Product{
  id: string;
  memorySize: number;
  slot: string;
  speed: number;
}
