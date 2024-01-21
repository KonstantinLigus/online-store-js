"use server";

import { signUp } from "@/backend/entities/users/domain/signUp-use-case";
import { compareStrings, getError } from "@/backend/helpers";
import { ParseError, PasswordsNotTheSameError } from "@/backend/helpers/errors";
import { redirectToPage } from "@/backend/libs/next";
import { userSignUpZodSchema } from "@/backend/libs/zod";

export async function signUpAction(_prevState, formData) {
  try {
    const newUser = Object.fromEntries(formData.entries());
    const { password, passwordRepeat } = newUser;
    const isPaswdsTheSame = compareStrings(password, passwordRepeat);
    if (!isPaswdsTheSame) throw new PasswordsNotTheSameError();
    const result = userSignUpZodSchema.safeParse(newUser);
    if (!result.success) {
      const errObj = result.error.flatten();
      const error =
        errObj.formErrors.length > 0 ? errObj.formErrors : errObj.fieldErrors;
      throw new ParseError(error);
    }
    const createdUser = await signUp(newUser);
    if (createdUser) redirectToPage("/account");
  } catch (err) {
    return getError(err).error;
  }
}
