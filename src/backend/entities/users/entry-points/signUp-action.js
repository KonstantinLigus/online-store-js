import { signUp } from "@/backend/entities/users/domain/signUp-use-case";
import { compareStrings, getError } from "@/backend/helpers";
import {
  UserParseError,
  PasswordsNotTheSameError,
} from "@/backend/helpers/errors";
import { redirectToPage } from "@/backend/libs/next";
import { userSignUpZodSchema } from "@/backend/libs/zod";

export async function signUpAction(_prevState, formData) {
  let createdUser = null;
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
      throw new UserParseError(error);
    }
    createdUser = await signUp(newUser);
  } catch (err) {
    return getError(err).error;
  }
  if (createdUser) redirectToPage("/account");
}
