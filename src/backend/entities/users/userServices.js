import "@/backend/db/connectDB";
import { User } from "./user.schema";

export const userServices = Object.freeze({
  getUserByField,
  createUser,
  updateUser,
});

async function getUserByField(objQuery) {
  const user = await User.findOne(objQuery);
  return user;
}

async function createUser(userObj) {
  const user = await User.create(userObj);
  return user;
}

async function updateUser(filter, updateObj) {
  const updatedUser = await User.findOneAndUpdate(filter, updateObj);
  return updatedUser;
}
