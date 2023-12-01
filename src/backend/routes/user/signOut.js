import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { cookies } from "next/headers";

async function signOut() {
  cookies().delete("token");
  return { message: "user signed out!" };
}

export default getTryCatchWrapper(signOut);
