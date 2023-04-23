import {Product} from "../product/product";

export interface Processor extends Product{
  id: string;
  chipset: string;
  clockSpeed: number;
  core: number;
}

export enum Chipset{
  amd = 'AMD',
  intel = 'Intel',
}
