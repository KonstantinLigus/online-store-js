import authOptions from "@/app/authOptions";
import NextAuth from "next-auth";

async function handler(req, res) {
  return NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };
