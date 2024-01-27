import authOptions from "@/backend/libs/next-auth/authOptions";
import { getServerSession } from "next-auth";
import { userServices } from "../data-access/userServices";
import { getCookie } from "@/backend/libs/next";
import { verifyToken } from "@/backend/libs/jwt";
import { UserNotAuthorizedError } from "@/backend/helpers/errors";

export async function updateUser(userData) {
  let userId = null;
  const session = await getServerSession(authOptions);
  if (session) {
    const user = await userServices.getUserByField({
      _id: session.user._id.toString(),
    });
    userId = user ? user._id.toString() : null;
  }
  const token = await getCookie("token");
  if (!session && token) {
    userId = verifyToken(token.value)._id;
  }
  if (!userId) throw new UserNotAuthorizedError();
  const updatedUser = userServices.updateUser({ _id: userId }, userData);
  return updatedUser;
}
