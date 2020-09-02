export function saveAccessToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}
export function deleteAccessToken() {
  localStorage.removeItem("accessToken");
}

export function getAccessToken(): string {
  return localStorage.getItem("accessToken");
}

export function isLoggedIn(): boolean {
  return localStorage.getItem("accessToken") ? true : false;
}
