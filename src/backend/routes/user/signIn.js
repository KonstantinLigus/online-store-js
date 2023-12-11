import userControllers from "@/backend/entities/users";
import { createAndSetUserTokenToCookie } from "@/backend/libs/jwt/createAndSetUserTokenToCookie";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { userSignInZodSchema } from "@/backend/libs/zod/user.signIn.schema";
import { comparePassword } from "@/backend/libs/bcrypt/comparePassword";
import {
  EmailNotVerifiedError,
  UserNotFoundError,
  WrongUserPasswordError,
} from "@/backend/helpers/errors";

async function signIn(req) {
  const user = await req.json();
  userSignInZodSchema.parse(user);
  const { email, password } = user;
  const { user: userFromDB, status } = await userControllers.getUserByField({
    email,
  });
  if (!userFromDB) throw new UserNotFoundError();
  const isPasswordMatch = await comparePassword({
    pswd: password,
    hashedPswd: userFromDB.password,
  });
  if (!isPasswordMatch) throw new WrongUserPasswordError();
  if (userFromDB.verificationToken) throw new EmailNotVerifiedError();
  createAndSetUserTokenToCookie(userFromDB._id);
  delete userFromDB._id;
  delete userFromDB.password;
  delete userFromDB.verificationToken;
  return { user: userFromDB, status };
}

export default getTryCatchWrapper(signIn);
