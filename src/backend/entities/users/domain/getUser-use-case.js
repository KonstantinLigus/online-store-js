import { cleanUserFields } from "@/backend/helpers";
import { userServices } from "../data-access/userServices";

export async function getUser(userId) {
  let userFromDB = await userServices.getUserById(userId);

  if (userFromDB) userFromDB = cleanUserFields(userFromDB);

  return userFromDB;
}
