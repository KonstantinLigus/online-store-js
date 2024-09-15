import { getServerSession } from "next-auth";
import { userServices } from "../data-access";
import { getCookie } from "@/backend/libs/next";
import { verifyToken } from "@/backend/libs/jwt";
import { UserNotAuthorizedError } from "@/backend/helpers/errors";
import { commentServices } from "../data-access/comment.services";
import authOptions from "@/backend/libs/next-auth/authOptions";

export async function createCommentCase(comment) {
  let user = null;

  const session = await getServerSession(authOptions);
  if (session)
    user = await userServices.getUserByField({
      _id: session.user._id.toString(),
    });

  const token = await getCookie("token");
  if (!session && token) {
    try {
      const userId = verifyToken(token.value)._id;
      user = await userServices.getUserByField({ _id: userId });
    } catch (err) {
      throw new UserNotAuthorizedError();
    }
  }
  if (!user) throw new UserNotAuthorizedError();
  comment.author = user._id;
  const createdComment = await commentServices.createComment(comment);
  return createdComment;
}
