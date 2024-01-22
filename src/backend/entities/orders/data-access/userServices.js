import "@/backend/db/connectDB";
import { User } from "./user.schema";

export const userServices = Object.freeze({
  getUserByField,
});

async function getUserByField(objQuery) {
  let user = await User.findOne(objQuery);
  user = user ? user.toObject() : user;
  return user;
}
