import "@/backend/db/connectDB";
import { User } from "./user.schema";

export const userServices = Object.freeze({
  getUserByField,
  createUser,
});

async function getUserByField(objQuery) {
  const user = await User.findOne(objQuery);
  return user;
}

async function createUser(userObj) {
  const user = await User.create(userObj);
  return user;
}
