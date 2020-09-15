import { Item } from "./Item.interface";

export interface CompleteBuild {
  id: string;
  price: number;
  name: string;
  imageUrl: string;
  cpuBrand: string;
  gpuBrand: string;
  subtitle: string;
  description: string;
  date: string;
  items: Item[];
}
