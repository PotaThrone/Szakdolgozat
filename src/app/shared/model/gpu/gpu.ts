import {Product} from "../product/product";

export interface Gpu extends Product{
  id: string;
  clock: number;
  memory: number;
  slot: string;
}

export enum GpuSlot{
  isa= 'ISA',
  pci= 'PCI',
  agp= 'AGP',
  pciExpress= 'PCI Express',
}
