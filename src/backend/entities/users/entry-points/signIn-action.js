"use server";

import { getError } from "@/backend/helpers";
import { ParseError } from "@/backend/helpers/errors";
import { redirectToPage } from "@/backend/libs/next";
import { userSignInZodSchema } from "@/backend/libs/zod";
import { signIn } from "../domain/signIn-use-case";
import { revalidatePath } from "next/cache";

export async function signInAction(_prevState, formData) {
  let isUserFromDB = null;
  let callbackUrl = null;
  try {
    const user = Object.fromEntries(formData.entries());
    callbackUrl = user.callbackUrl;
    const result = userSignInZodSchema.safeParse(user);
    if (!result.success) throw new ParseError(result.error);
    isUserFromDB = await signIn(user);
  } catch (err) {
    return getError(err).error;
  }
  if (isUserFromDB && callbackUrl) redirectToPage(callbackUrl, "replace");
}
