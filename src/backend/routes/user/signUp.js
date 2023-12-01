import bcrypt from "bcrypt";
import crypto from "crypto";
import { userSignUpZodSchema } from "@/backend/libs/zod/user.signUp.zod.schema";
import userControllers from "@/backend/entities/users";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { createAndSetUserTokenToCookie } from "@/backend/libs/jwt/createAndSetUserTokenToCookie";

async function signUp(req) {
  const user = await req.json();
  userSignUpZodSchema.parse(user);
  const { password, email } = user;
  const { user: userFromDB } = await userControllers.getUserByField({ email });
  if (userFromDB) {
    const userExistError = new Error(`Email: ${email} have already exist`);
    userExistError.name = "UserExistError";
    throw userExistError;
  }
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(password, salt);
  user.verificationToken = crypto.randomUUID();
  const { user: createdUser, status } = await userControllers.createUser(user);
  createAndSetUserTokenToCookie(createdUser._id);
  delete createdUser._id;
  delete createdUser.password;
  return { createdUser, status };
}

export default getTryCatchWrapper(signUp);
