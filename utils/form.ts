import FormErrors from "../components/BuildForm/FormErrors";
import ComponentError from "../components/BuildForm/ComponentError";

export function parseErrors(errorDetails): FormErrors {
  const errors = new FormErrors();
  errorDetails.forEach(({ message, path }: { message: string; path: string[] }) => {
    if (path.length === 1) {
      errors.set(path[0], message);
    } else {
      const componentError = errors.get(path[0]) || new ComponentError();
      componentError.set(path[1], message);
      errors.set(path[0], componentError);
    }
  });
  console.info(errors);
  return errors;
}
