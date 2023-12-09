import bcrypt from "bcrypt";
import crypto from "crypto";
import { userSignUpZodSchema } from "@/backend/libs/zod/user.signUp.zod.schema";
import userControllers from "@/backend/entities/users";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { createAndSetUserTokenToCookie } from "@/backend/libs/jwt/createAndSetUserTokenToCookie";
import { sendEmail } from "@/backend/libs/send-grid/send-email";
import { createVerifyEmailMessage } from "@/backend/libs/send-grid/messages";

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
  const verificationToken = crypto.randomUUID();
  user.verificationToken = verificationToken;
  const message = createVerifyEmailMessage({
    email,
    verificationToken,
  });
  await sendEmail(message);
  const { user: createdUser, status } = await userControllers.createUser(user);
  createAndSetUserTokenToCookie(createdUser._id);
  delete createdUser._id;
  delete createdUser.password;
  delete createdUser.verificationToken;
  return { createdUser, status };
}

export default getTryCatchWrapper(signUp);
