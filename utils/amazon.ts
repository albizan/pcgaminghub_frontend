import { CompleteBuild } from "../interfaces/CompleteBuild.interface";

export function createCartUrl(completeBuild: CompleteBuild, ref: string): string {
  const { items } = completeBuild;
  let cartUrl = "https://www.amazon.it/gp/aws/cart/add-res.html?";
  let cartItems = 0;
  items.forEach(({ asin }, i) => {
    if (asin) {
      cartItems++;
      cartUrl += `ASIN.${i + 1}=${asin}&Quantity.${i + 1}=1&`;
    }
  });
  cartUrl += `tag=${ref}&AssociateTag=${ref}`;
  return cartUrl;
}
