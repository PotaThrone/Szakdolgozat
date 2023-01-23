import {Gpu} from "../gpu/gpu";
import {Hdd} from "../hdd/hdd";
import {Motherboard} from "../motherboard/motherboard";
import {Processor} from "../processor/processor";
import {Ram} from "../ram/ram";

export interface Pc{
  id: string;
  gpu: Gpu;
  hdd: Hdd;
  motherboard: Motherboard;
  processor: Processor;
  ram: Ram;
}
