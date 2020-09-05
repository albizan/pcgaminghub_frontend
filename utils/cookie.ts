import Cookies from "universal-cookie";
import { NextPageContext } from "next";

export function setAuthCookie(accessToken: string) {
  const cookies = new Cookies();
  cookies.set("accessToken", accessToken, { path: "/" });
}

export function removeAuthCookie() {
  const cookies = new Cookies();
  cookies.remove("accessToken");
}

export function checkAuthCookie(context: NextPageContext) {
  const cookies = new Cookies(context.req ? context.req.headers.cookie : null);
  const accessToken = cookies.get("accessToken") || "";
  return accessToken;
}
