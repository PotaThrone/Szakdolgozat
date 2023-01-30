import {Product} from "../product/product";

export interface Motherboard extends Product{
  id: string;
  chipset: string;
  gpuSlots: string;
  hddCable: string;
  ramCount: number;
  ramSlots: string;
}
