import { getError } from "@/backend/helpers";
import { UserParseError } from "@/backend/helpers/errors";
import { redirectToPage } from "@/backend/libs/next";
import { userSignInZodSchema } from "@/backend/libs/zod";
import { signIn } from "../domain/signIn-use-case";

export async function signInAction(_prevState, formData) {
  let userFromDB = null;
  try {
    const user = Object.fromEntries(formData.entries());
    const result = userSignInZodSchema.safeParse(user);
    if (!result.success) {
      const errObj = result.error.flatten();
      const error =
        errObj.formErrors.length > 0 ? errObj.formErrors : errObj.fieldErrors;
      throw new UserParseError(error);
    }
    userFromDB = await signIn(user);
  } catch (err) {
    return getError(err).error;
  }
  if (userFromDB) redirectToPage("/account");
}
