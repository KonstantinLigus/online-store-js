import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import authOptions from "@/backend/libs/next-auth/authOptions";
import NextAuth from "next-auth";

export default NextAuth(authOptions);
