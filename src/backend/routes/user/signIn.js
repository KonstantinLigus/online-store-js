import bcrypt from "bcrypt";
import userControllers from "@/backend/entities/users";
import { createAndSetUserTokenToCookie } from "@/backend/libs/jwt/createAndSetUserTokenToCookie";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { userSignInZodSchema } from "@/backend/libs/zod/user.signIn.schema";

async function signIn(req) {
  const user = await req.json();
  userSignInZodSchema.parse(user);
  const { email, password } = user;
  const { user: userFromDB, status } = await userControllers.getUserByField({
    email,
  });
  if (!userFromDB) {
    const userNotFoundError = new Error("Wrong email!");
    userNotFoundError.name = "UserNotFound";
    throw userNotFoundError;
  }
  const isPasswordMatch = await bcrypt.compare(password, userFromDB.password);
  if (!isPasswordMatch) {
    const wrongUserPasswordError = new Error("Wrong password!");
    wrongUserPasswordError.name = "WrongUserPassword";
    throw wrongUserPasswordError;
  }
  createAndSetUserTokenToCookie(userFromDB._id);
  delete userFromDB._id;
  delete userFromDB.password;
  return { user: userFromDB, status };
}

export default getTryCatchWrapper(signIn);
