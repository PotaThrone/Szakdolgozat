import {Product} from "../product/product";

export interface Ram extends Product{
  id: string;
  memorySize: number;
  slot: string;
  speed: number;
}

export enum RamSlot{
  ddr1 = 'DDR1',
  ddr2 = 'DDR2',
  ddr3 = 'DDR3',
  ddr4 = 'DDR4',
  ddr5 = 'DDR5',
}
