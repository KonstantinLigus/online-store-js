import jwt from "jsonwebtoken";

const { NEXTAUTH_SECRET } = process.env;

export function verifyToken(token) {
  let result = jwt.verify(token, NEXTAUTH_SECRET);
  return result;
}
