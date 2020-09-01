import { Item } from "./Item.interface";

export interface CompleteBuild {
  id: string;
  price: number;
  name: string;
  cpuBrand: string;
  gpuBrand: string;
  description: string;
  date: string;
  items: Item[];
}
