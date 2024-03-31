import authOptions from "@/backend/libs/next-auth/authOptions";
import { getServerSession } from "next-auth";

export async function getUserIdFromNextAuth() {
  let userId = null;

  const session = await getServerSession(authOptions);
  if (session) {
    userId = session.user._id;
    return userId;
  }

  return userId;
}
