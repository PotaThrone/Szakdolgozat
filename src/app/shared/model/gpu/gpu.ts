import {Product} from "../product/product";

export interface Gpu extends Product{
  id: string;
  clock: number;
  memory: number;
  slot: string;
}
