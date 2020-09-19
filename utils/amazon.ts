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

export function extractAsinFromUrl(url: string): string {
  // Check if url is not a true url but already a valid asin
  if (url.length === 10) return url;
  // Clean url from queries and refs
  let baseUrl = url.split("?")[0].split("/ref=")[0];
  if (baseUrl.charAt(baseUrl.length - 1) === "/") {
    baseUrl = baseUrl.substring(0, baseUrl.length - 1);
  }
  // When url is cleaned, ASIN is the latest element of the url string
  const splittedUrl = baseUrl.split("/");
  const asin = splittedUrl.slice(-1)[0];
  return asin;
}
