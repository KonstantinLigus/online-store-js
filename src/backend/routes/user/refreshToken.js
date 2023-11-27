import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

async function refreshToken(req) {
  const token = req.cookies.get("token");
  return { token, status: 200 };
}

export default getTryCatchWrapper(refreshToken);
