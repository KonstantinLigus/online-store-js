import userControllers from "@/backend/entities/users";
import { UserNotExistError } from "@/backend/helpers/errors";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

async function verifyEmail(req, { params: { verificationToken } }) {
  const { user: userFromDB } = await userControllers.getUserByField({
    verificationToken,
  });
  if (!userFromDB) throw new UserNotExistError();
  await userControllers.updateUser(
    {
      verificationToken,
    },
    {
      verificationToken: null,
    },
  );
  return { message: "Successfuly verified!", status: 200 };
}

export default getTryCatchWrapper(verifyEmail);
