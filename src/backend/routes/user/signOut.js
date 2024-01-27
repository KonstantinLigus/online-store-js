import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { deleteCookie } from "@/backend/libs/next/cookieOperations";

async function signOut() {
  await deleteCookie("token");
  return { message: "user signed out!" };
}

export default getTryCatchWrapper(signOut);
