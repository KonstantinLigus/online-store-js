import { cookies } from "next/headers";

const { TOKEN_LIFE_TIME } = process.env;

export function deleteCookie(name) {
  cookies().delete(name);
}

export function setUserTokenToCookie(token) {
  cookies().set({
    name: "token",
    value: token,
    path: "/",
    maxAge: TOKEN_LIFE_TIME,
  });
}

export function getCookie(name) {
  return cookies().get(name);
}