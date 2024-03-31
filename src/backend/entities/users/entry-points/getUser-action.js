"use server";

import { getServerSession } from "next-auth";
import authOptions from "@/backend/libs/next-auth/authOptions";
import { getUser } from "../domain/getUser-use-case";
import { getUserIdFromToken } from "../domain/getUserIdFromToken-use-case";

export async function getUserAction() {
  const session = await getServerSession(authOptions);
  if (session) return session.user;

  const userId = await getUserIdFromToken();
  const userFromDB = userId ? await getUser(userId) : null;
  return userFromDB;
}
