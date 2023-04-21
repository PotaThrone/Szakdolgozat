import {Comment} from "../user/user";

export interface Product {
  id: string;
  brand: string;
  price: number;
  description: string;
  rating: number;
  count: number;
  comments: Comment[] | null;
}

export interface LastId {
  lastId: number;
}

export enum CollectionName {
  GPU = "GPU",
  HDD = "HDD",
  RAM = "RAM",
  MOTHERBOARD = "Motherboard",
  PROCESSOR = "Processor",
}

export enum ProductType {
  GPU = "gpu",
  HDD = "hdd",
  RAM = "ram",
  MOTHERBOARD = "motherboard",
  PROCESSOR = "processor",
}
