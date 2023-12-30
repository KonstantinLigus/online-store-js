import { userServices } from "../userServices";
import {
  EmailNotVerifiedError,
  UserNotFoundError,
  WrongUserPasswordError,
} from "@/backend/helpers/errors";
import { comparePassword } from "@/backend/libs/bcrypt";
import { createUserToken } from "@/backend/libs/jwt";
import { setUserTokenToCookie } from "@/backend/libs/next";

export async function signIn(user) {
  const { email, password } = user;
  const userFromDB = await userServices.getUserByField({
    email,
  });
  if (!userFromDB) throw new UserNotFoundError();
  const isPasswordMatch = await comparePassword({
    pswd: password,
    hashedPswd: userFromDB.password || "",
  });
  if (!isPasswordMatch) throw new WrongUserPasswordError();
  if (userFromDB.verificationToken) throw new EmailNotVerifiedError();
  const token = createUserToken(userFromDB._id);
  setUserTokenToCookie(token);
  delete userFromDB._id;
  delete userFromDB.password;
  delete userFromDB.verificationToken;
  return userFromDB;
}
