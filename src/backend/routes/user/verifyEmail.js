import userControllers from "@/backend/entities/users";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

async function verifyEmail(req, { params: { verificationToken } }) {
  const { user: userFromDB } = await userControllers.getUserByField({
    verificationToken,
  });
  if (!userFromDB) {
    const userExistError = new Error("User doesn't exist!");
    userExistError.name = "UserNotFound";
    throw userExistError;
  }
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
