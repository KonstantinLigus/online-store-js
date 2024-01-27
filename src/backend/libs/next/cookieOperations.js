"use server";

import { cookies } from "next/headers";

const { TOKEN_LIFE_TIME } = process.env;

export async function deleteCookie(name) {
  cookies().delete(name);
}

export async function setUserTokenToCookie(token) {
  cookies().set({
    name: "token",
    value: token,
    path: "/",
    maxAge: TOKEN_LIFE_TIME,
  });
}

export async function getCookie(name) {
  return cookies().get(name);
}
