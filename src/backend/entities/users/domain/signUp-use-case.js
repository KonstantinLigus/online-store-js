import { userServices } from "../data-access/userServices";
import { UserExistError } from "@/backend/helpers/errors";
import { getRandomUUID } from "@/backend/libs/crypto";
import { getHashedPassword } from "@/backend/libs/bcrypt";
import { createVerifyEmailMessage, sendEmail } from "@/backend/libs/send-grid";
import { createUserToken } from "@/backend/libs/jwt";
import { setUserTokenToCookie } from "@/backend/libs/next";

export async function signUp(newUser) {
  const { email, password } = newUser;

  const userFromDB = await userServices.getUserByField({ email });

  if (userFromDB) throw new UserExistError(email);

  const verificationToken = getRandomUUID();

  newUser.password = await getHashedPassword(password);
  newUser.verificationToken = verificationToken;

  const createdUser = await userServices.createUser(newUser);

  const token = createUserToken(createdUser._id);
  await setUserTokenToCookie(token);

  const message = createVerifyEmailMessage({
    email,
    verificationToken,
  });
  await sendEmail(message);

  return true;
}
