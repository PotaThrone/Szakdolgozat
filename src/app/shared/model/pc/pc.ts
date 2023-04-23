import {Product} from "../product/product";
import {Gpu} from "../gpu/gpu";
import {Hdd} from "../hdd/hdd";
import {Motherboard} from "../motherboard/motherboard";
import {Processor} from "../processor/processor";
import {Ram} from "../ram/ram";

export interface Pc{
  gpu: Gpu | null;
  hdd: Hdd | null;
  motherboard: Motherboard | null;
  processor: Processor | null;
  ram: Ram | null;
}
