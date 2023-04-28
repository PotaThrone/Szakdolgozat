import {Product} from "../product/product";
import {GpuSlot} from "../gpu/gpu";
import {CableType} from "../hdd/hdd";
import {RamSlot} from "../ram/ram";
import {Chipset} from "../processor/processor";

export interface Motherboard extends Product{
  id: string;
  chipset: Chipset;
  gpuSlots: GpuSlot;
  hddCable: CableType;
  ramCount: number;
  ramSlots: RamSlot;
}
