import { userServices } from "@/backend/entities/users/data-access/userServices";
import {
  UserNotFoundError,
  WrongUserPasswordError,
} from "@/backend/helpers/errors";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { isPasswordsTheSame, getHashedPassword } from "@/backend/libs/bcrypt";
import { userPasswordRestoreZodSchema } from "@/backend/libs/zod";

async function passwordChange(req) {
  const userData = await req.json();
  userPasswordRestoreZodSchema.parse(userData);
  const { email, oldPassword, newPassword } = userData;
  const userFromDB = await userServices.getUserByField({
    email,
  });
  if (!userFromDB) throw new UserNotFoundError();
  const isPswdsTheSame = await isPasswordsTheSame({
    pswd: oldPassword,
    hashedPswd: userFromDB.password,
  });
  if (!isPswdsTheSame) throw new WrongUserPasswordError();
  const newHashedPassword = await getHashedPassword(newPassword);
  await userServices.updateUser({ email }, { password: newHashedPassword });
  return { message: "Password was changed", status: 200 };
}

export default getTryCatchWrapper(passwordChange);
