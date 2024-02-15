"use server";

import { signUp } from "@/backend/entities/users/domain/signUp-use-case";
import { compareStrings, getError } from "@/backend/helpers";
import { ParseError, PasswordsNotTheSameError } from "@/backend/helpers/errors";
import { redirectToPage } from "@/backend/libs/next";
import { userSignUpZodSchema } from "@/backend/libs/zod";

export async function signUpAction(_prevState, formData) {
  let isUserCreated = null;
  try {
    const newUser = Object.fromEntries(formData.entries());
    const result = userSignUpZodSchema.safeParse(newUser);
    if (!result.success) throw new ParseError(result.error);
    const { password, passwordRepeat } = newUser;
    const isPaswdsTheSame = compareStrings(password, passwordRepeat);
    if (!isPaswdsTheSame) throw new PasswordsNotTheSameError();
    isUserCreated = await signUp(newUser);
  } catch (err) {
    return getError(err).error;
  }
  if (isUserCreated) redirectToPage("/account");
}
