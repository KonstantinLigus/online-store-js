import { userServices } from "../data-access/userServices";
import { UserExistError } from "@/backend/helpers/errors";
import { getRandomUUID } from "@/backend/libs/crypto";
import { getHashedPassword } from "@/backend/libs/bcrypt";
import { createVerifyEmailMessage, sendEmail } from "@/backend/libs/send-grid";
import { createUserToken } from "@/backend/libs/jwt";
import { setUserTokenToCookie } from "@/backend/libs/next";

export async function signUp(newUser) {
  const { password, email } = newUser;
  const userFromDB = await userServices.getUserByField({ email });
  if (userFromDB) throw new UserExistError(email);
  newUser.password = await getHashedPassword(password);
  const verificationToken = getRandomUUID();
  newUser.verificationToken = verificationToken;
  const message = createVerifyEmailMessage({
    email,
    verificationToken,
  });
  await sendEmail(message);
  const createdUser = await userServices.createUser(user);
  const token = createUserToken(createdUser._id);
  setUserTokenToCookie(token);
  delete createdUser._id;
  delete createdUser.password;
  delete createdUser.verificationToken;
  return createdUser;
}
