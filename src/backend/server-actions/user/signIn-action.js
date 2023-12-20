import userControllers from "@/backend/entities/users";
import { comparePassword } from "@/backend/libs/bcrypt";
import { userSignInZodSchema } from "@/backend/libs/zod";

export async function signIn(_prevState, formData) {
  const user = Object.fromEntries(formData.entries());
  const validatedFields = userSignInZodSchema.safeParse(user);
  if (!validatedFields.success) {
    const errObj = validatedFields.error.flatten();
    return errObj.formErrors.length > 0
      ? errObj.formErrors
      : errObj.fieldErrors;
  }
  const { email, password } = user;
  const { user: userFromDB } = await userControllers.getUserByField({
    email,
  });
  if (!userFromDB) return { message: "Wrong email!" };
  const isPasswordMatch = await comparePassword({
    pswd: password,
    hashedPswd: userFromDB.password,
  });
  if (!isPasswordMatch) throw new WrongUserPasswordError();
  if (userFromDB.verificationToken) throw new EmailNotVerifiedError();
  const token = createUserToken(userFromDB._id);
  setUserTokenToCookie(token);
  delete userFromDB._id;
  delete userFromDB.password;
  delete userFromDB.verificationToken;
  return { user: userFromDB, status };
}
