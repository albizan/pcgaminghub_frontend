export default class DefaultValues {
  name: string;
  price: string;
  description: string;
  cpuBrand: string;
  gpuBrand: string;
  CPU: Component;
  GPU: Component;
  SSD?: Component;
  HDD?: Component;
  Alimentatore: Component;
  Case: Component;
  RAM: Component;
  Dissipatore?: Component;
  "Scheda Madre": Component;

  setComponent(key: string, component: Component) {
    console.log(component);
    console.info(`Set ${key} to ${component}`);
    if (typeof (this[key] === "Component")) this[key] = component;
  }

  setValue(key: string, value: string) {
    if (this[key] instanceof String) this[key] = value;
  }
}

type Component = {
  asin: string;
  label: string;
};
