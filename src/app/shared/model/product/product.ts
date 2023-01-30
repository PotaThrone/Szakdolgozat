import {Gpu} from "../gpu/gpu";

export interface Product{
  id: string;
  brand: string;
  price: number;
  description: string;
  rating: number;
  count: number;
}

export const isGpu = (product: Product): product is Gpu => {
  return 'gpu' in product;
}
