import userControllers from "@/backend/entities/users";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { getHashedPassword } from "@/backend/libs/bcrypt/getHashPassword";
import { getRandomUUID } from "@/backend/libs/crypto/getRandomUUID";
import { createPasswordRecoverMessage } from "@/backend/libs/send-grid/messages";
import { sendEmail } from "@/backend/libs/send-grid/send-email";
import { userPasswordRecoverZodSchema } from "@/backend/libs/zod/user.passwordRecover.schema";

async function passwordRecover(req) {
  const userEmailObj = await req.json();
  userPasswordRecoverZodSchema.parse(userEmailObj);
  const { email } = userEmailObj;
  const { user: userFromDB, status } = await userControllers.getUserByField({
    email,
  });
  if (!userFromDB) {
    const userNotFoundError = new Error("Wrong email!");
    userNotFoundError.name = "UserNotFound";
    throw userNotFoundError;
  }
  const newPassword = getRandomUUID().substring(0, 8);
  const newHashedPassword = await getHashedPassword(newPassword);
  await userControllers.updateUser({ email }, { password: newHashedPassword });
  const messageWithNewPassword = createPasswordRecoverMessage({
    email,
    newPassword,
  });
  await sendEmail(messageWithNewPassword);
  return { message: `New password was sent to ${email}`, status };
}

export default getTryCatchWrapper(passwordRecover);
