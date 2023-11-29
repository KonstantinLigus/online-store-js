import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const { TOKEN_LIFE_TIME, NEXTAUTH_SECRET } = process.env;

export function createAndSetUserTokenToCookie(_id) {
  const token = jwt.sign({ _id }, NEXTAUTH_SECRET, {
    expiresIn: Number(TOKEN_LIFE_TIME),
  });
  cookies().set({
    name: "token",
    value: token,
    path: "/",
    maxAge: TOKEN_LIFE_TIME,
  });
}
