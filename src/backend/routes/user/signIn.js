import userControllers from "@/backend/entities/users";
import { createAndSetUserTokenToCookie } from "@/backend/libs/jwt/createAndSetUserTokenToCookie";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { userSignInZodSchema } from "@/backend/libs/zod/user.signIn.schema";
import { comparePassword } from "@/backend/libs/bcrypt/comparePassword";

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
  const isPasswordMatch = await comparePassword({
    pswd: password,
    hashedPswd: userFromDB.password,
  });
  if (!isPasswordMatch) {
    const wrongUserPasswordError = new Error("Wrong password!");
    wrongUserPasswordError.name = "WrongUserPassword";
    throw wrongUserPasswordError;
  }
  if (userFromDB.verificationToken) {
    const emailNotVerifiedError = new Error("Email was not verified!");
    emailNotVerifiedError.name = "emailNotVerifiedError";
    throw emailNotVerifiedError;
  }
  createAndSetUserTokenToCookie(userFromDB._id);
  delete userFromDB._id;
  delete userFromDB.password;
  delete userFromDB.verificationToken;
  return { user: userFromDB, status };
}

export default getTryCatchWrapper(signIn);
