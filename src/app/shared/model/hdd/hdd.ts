import {Product} from "../product/product";

export interface Hdd extends Product{
  id: string;
  cableType: string;
  size: number;
}
