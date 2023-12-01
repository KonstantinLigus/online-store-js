import userControllers from "@/backend/entities/users";
import { createAndSetUserTokenToCookie } from "@/backend/libs/jwt/createAndSetUserTokenToCookie";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { verifyToken } from "@/backend/libs/jwt/verifyToken";

async function refreshToken(req) {
  const token = req.cookies.get("token");
  if (!token) {
    const notFoundTokenError = new Error("Token not found!");
    notFoundTokenError.name = "tokenError";
    throw notFoundTokenError;
  }
  const result = verifyToken(token.value);
  if (!result._id) {
    const invalidTokenDataError = new Error("Invalid data in token");
    invalidTokenDataError.name = "invalidTokenDataError";
  }
  const userFromDB = await userControllers.getUserByField({ _id: result._id });
  if (!userFromDB) throw new Error("User not found");
  createAndSetUserTokenToCookie(userFromDB._id);
  return { message: "Token was refreshed successfully", status: 200 };
}

export default getTryCatchWrapper(refreshToken);
