import { userServices } from "@/backend/entities/users/data-access/userServices";
import { UserNotFoundError } from "@/backend/helpers/errors";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { getHashedPassword } from "@/backend/libs/bcrypt/getHashPassword";
import { getRandomUUID } from "@/backend/libs/crypto/getRandomUUID";
import { createPasswordRecoverMessage } from "@/backend/libs/send-grid/messages";
import { sendEmail } from "@/backend/libs/send-grid/send-email";
import { userEmailZodSchema } from "@/backend/libs/zod/user.email.schema";

async function passwordRecover(req) {
  const userEmailObj = await req.json();
  userEmailZodSchema.parse(userEmailObj);
  const { email } = userEmailObj;
  const userFromDB = await userServices.getUserByField({
    email,
  });
  if (!userFromDB) throw new UserNotFoundError();
  const newPassword = getRandomUUID().substring(0, 8);
  const newHashedPassword = await getHashedPassword(newPassword);
  await userServices.updateUser({ email }, { password: newHashedPassword });
  const messageWithNewPassword = createPasswordRecoverMessage({
    email,
    newPassword,
  });
  await sendEmail(messageWithNewPassword);
  return { message: `New password was sent to ${email}`, status: 200 };
}

export default getTryCatchWrapper(passwordRecover);
