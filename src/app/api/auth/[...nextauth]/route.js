import getAuthOptions from "@/app/authOptions";
import NextAuth from "next-auth";

async function handler(req, res) {
  return NextAuth(req, res, await getAuthOptions());
}

export { handler as GET, handler as POST };
