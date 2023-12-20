"use server";

import userControllers from "@/backend/entities/users";
import { getRandomUUID } from "@/backend/libs/crypto/getRandomUUID";
import { createUserToken } from "@/backend/libs/jwt/createUserToken";
import { setUserTokenToCookie } from "@/backend/libs/next/cookieOperations";
import { createVerifyEmailMessage } from "@/backend/libs/send-grid/messages";
import { sendEmail } from "@/backend/libs/send-grid/send-email";
import { userSignUpZodSchema } from "@/backend/libs/zod";

export async function signUp(_prevState, formData) {
  const newUser = Object.fromEntries(formData.entries());
  const validatedFields = userSignUpZodSchema.safeParse(newUser);
  if (!validatedFields.success) {
    const errObj = validatedFields.error.flatten();
    return errObj.formErrors.length > 0
      ? errObj.formErrors
      : errObj.fieldErrors;
  }
  const { password, email } = newUser;
  const { user: userFromDB } = await userControllers.getUserByField({
    email,
  });
  if (userFromDB) return { message: `Email: ${email} have already exist!` };
  newUser.password = await getHashedPassword(password);
  const verificationToken = getRandomUUID();
  newUser.verificationToken = verificationToken;
  const message = createVerifyEmailMessage({
    email,
    verificationToken,
  });
  await sendEmail(message);
  const { user: createdUser } = await userControllers.createUser(newUser);
  const token = createUserToken(createdUser._id);
  setUserTokenToCookie(token);
  delete createdUser._id;
  delete createdUser.password;
  delete createdUser.verificationToken;
  return { message: "User created" };
}
