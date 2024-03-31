import { getCookie } from "@/backend/libs/next";
import { verifyToken } from "@/backend/libs/jwt";

export async function getUserIdFromToken() {
  let userId = null;

  const token = await getCookie("token");
  if (token) {
    userId = verifyToken(token.value)._id;
    return userId;
  }

  return userId;
}
