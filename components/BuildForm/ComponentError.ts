export default class ComponentError {
  asin;
  label;

  set(key: string, value: string) {
    this[key] = value;
  }
}
