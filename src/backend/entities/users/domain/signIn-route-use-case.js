import { comparePassword } from "@/backend/libs/bcrypt";
import { createUserToken } from "@/backend/libs/jwt";
import { setUserTokenToCookie } from "@/backend/libs/next";
import { userServices } from "../data-access/userServices";
import {
  EmailNotVerifiedError,
  PasswordsNotTheSameError,
  UserNotFoundError,
} from "@/backend/helpers/errors";

export async function signInRouteHelper(user) {
  const { email, password } = user;
  const userFromDB = await userServices.getUserByField({
    email,
  });
  if (!userFromDB)
    // return NextResponse.json(
    //   { error: { email: "email не знайдено" } },
    //   { status: 400 },
    // );
    throw new UserNotFoundError();

  const isPasswordMatch = await comparePassword({
    pswd: password,
    hashedPswd: userFromDB.password || "",
  });
  if (!isPasswordMatch)
    // return NextResponse.json(
    //   { error: { password: "Невірний пароль" } },
    //   { status: 400 },
    // );
    throw new PasswordsNotTheSameError();

  if (userFromDB.verificationToken)
    // return NextResponse.json(
    //   { error: { email: "email не підтверджений" } },
    //   { status: 400 },
    // );
    throw new EmailNotVerifiedError();

  const token = createUserToken(userFromDB._id);
  await setUserTokenToCookie(token);

  return true;
}
