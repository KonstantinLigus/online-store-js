import userServices from "@/backend/entities/users/data-access/userServices";
import { createUserToken } from "@/backend/libs/jwt/createUserToken";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { userSignInZodSchema } from "@/backend/libs/zod/user.signIn.schema";
import { isPasswordsTheSame } from "@/backend/libs/bcrypt/isPasswordsTheSame";
import {
  EmailNotVerifiedError,
  UserNotFoundError,
  WrongUserPasswordError,
} from "@/backend/helpers/errors";
import { setUserTokenToCookie } from "@/backend/libs/next/cookieOperations";

async function signIn(req) {
  const user = await req.json();
  userSignInZodSchema.parse(user);
  const { email, password } = user;
  const { user: userFromDB, status } = await userServices.getUserByField({
    email,
  });
  if (!userFromDB) throw new UserNotFoundError();
  const isPasswordMatch = await isPasswordsTheSame({
    pswd: password,
    hashedPswd: userFromDB.password,
  });
  if (!isPasswordMatch) throw new WrongUserPasswordError();
  if (userFromDB.verificationToken) throw new EmailNotVerifiedError();
  const token = createUserToken(userFromDB._id);
  await setUserTokenToCookie(token);
  delete userFromDB._id;
  delete userFromDB.password;
  delete userFromDB.verificationToken;
  return { user: userFromDB, status };
}

export default getTryCatchWrapper(signIn);
