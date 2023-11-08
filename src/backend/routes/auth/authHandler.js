import authOptions from "@/backend/libs/authOptions";
import NextAuth from "next-auth";

export async function authHandler(req, res) {
  return NextAuth(req, res, authOptions);
}
