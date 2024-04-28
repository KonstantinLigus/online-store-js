import userServices from "@/backend/entities/users/data-access/userServices";
import { UserNotExistError } from "@/backend/helpers/errors";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

async function verifyEmail(req, { params: { verificationToken } }) {
  const { user: userFromDB } = await userServices.getUserByField({
    verificationToken,
  });
  if (!userFromDB) throw new UserNotExistError();
  await userServices.updateUser(
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
