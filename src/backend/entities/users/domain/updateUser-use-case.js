import { cleanUserFields } from "@/backend/helpers";
import { userServices } from "../data-access/userServices";

export async function updateUser(userId, userData) {
  const updatedUser = await userServices.updateUser({ _id: userId }, userData);
  if (updatedUser) {
    updatedUser = cleanUserFields(updatedUser);
  }
  return updatedUser;
}
