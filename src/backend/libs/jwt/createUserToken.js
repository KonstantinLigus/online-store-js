import jwt from "jsonwebtoken";

const { NEXTAUTH_SECRET, TOKEN_LIFE_TIME } = process.env;

export function createUserToken(_id) {
  const token = jwt.sign({ _id }, NEXTAUTH_SECRET, {
    expiresIn: Number(TOKEN_LIFE_TIME),
  });
  return token;
}
