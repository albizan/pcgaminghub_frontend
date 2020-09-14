import ComponentError from "./ComponentError";

export default class BuildFormError {
  name: string;
  price: number;
  cpuBrand: string;
  gpuBrand: string;
  imageUrl: string;
  subTitle: string;
  description: string;
  CPU: ComponentError;
  "Scheda Madre": ComponentError;
  Alimentatore: ComponentError;
  Case: ComponentError;
  RAM: ComponentError;
  GPU: ComponentError;
  SSD: ComponentError;
  HDD: ComponentError;
  Dissipatore: ComponentError;

  set(key: string, value: string | ComponentError) {
    this[key] = value;
  }

  get(key: string): ComponentError {
    if (!(this[key] instanceof String)) return this[key];
  }
}
