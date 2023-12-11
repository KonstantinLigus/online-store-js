import { userSignUpZodSchema } from "@/backend/libs/zod/user.signUp.zod.schema";
import userControllers from "@/backend/entities/users";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { createAndSetUserTokenToCookie } from "@/backend/libs/jwt/createAndSetUserTokenToCookie";
import { sendEmail } from "@/backend/libs/send-grid/send-email";
import { createVerifyEmailMessage } from "@/backend/libs/send-grid/messages";
import { getHashedPassword } from "@/backend/libs/bcrypt/getHashPassword";
import { getRandomUUID } from "@/backend/libs/crypto/getRandomUUID";
import { UserExistError } from "@/backend/helpers/errors";

async function signUp(req) {
  const user = await req.json();
  userSignUpZodSchema.parse(user);
  const { password, email } = user;
  const { user: userFromDB } = await userControllers.getUserByField({ email });
  if (userFromDB) throw new UserExistError(email);
  user.password = await getHashedPassword(password);
  const verificationToken = getRandomUUID();
  user.verificationToken = verificationToken;
  const message = createVerifyEmailMessage({
    email,
    verificationToken,
  });
  await sendEmail(message);
  const { user: createdUser, status } = await userControllers.createUser(user);
  createAndSetUserTokenToCookie(createdUser._id);
  delete createdUser._id;
  delete createdUser.password;
  delete createdUser.verificationToken;
  return { createdUser, status };
}

export default getTryCatchWrapper(signUp);
