"use server";

import { getError } from "@/backend/helpers";
import { ParseError } from "@/backend/helpers/errors";
import { redirectToPage } from "@/backend/libs/next";
import { userSignInZodSchema } from "@/backend/libs/zod";
import { signIn } from "../domain/signIn-use-case";

export async function signInAction(_prevState, formData) {
  let userFromDB = null;
  try {
    const user = Object.fromEntries(formData.entries());
    const result = userSignInZodSchema.safeParse(user);
    if (!result.success) throw new ParseError(result.error);
    userFromDB = await signIn(user);
  } catch (err) {
    return getError(err).error;
  }
  if (userFromDB) redirectToPage("/account");
}
