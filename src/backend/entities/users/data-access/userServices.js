import "@/backend/db/connectDB";
import { User } from "./user.schema";

export const userServices = Object.freeze({
  getUserByField,
  createUser,
  updateUser,
});

async function getUserByField(objQuery) {
  let user = await User.findOne(objQuery);
  user = user ? user.toObject() : user;
  return user;
}

async function createUser(userObj) {
  const user = await User.create(userObj);
  return user.toObject();
}

async function updateUser(filter, updateObj) {
  const updatedUser = await User.findOneAndUpdate(filter, updateObj, {
    new: true,
  });
  return updatedUser;
}
