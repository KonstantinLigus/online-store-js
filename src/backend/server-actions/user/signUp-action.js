"use server";

import { signUp } from "@/backend/entities/users/domain/signUp-use-case";
import { getError } from "@/backend/helpers";
import { userSignUpZodSchema } from "@/backend/libs/zod";

export async function signUpAction(_prevState, formData) {
  try {
    const newUser = Object.fromEntries(formData.entries());
    userSignUpZodSchema.parse(newUser);
    signUp(newUser);
  } catch (err) {
    err.name = "signUpZodError";
    return getError(err).error;
  }
}
