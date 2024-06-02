import "@/backend/db/connectDB";
import { User } from "./user.schema";

export const userServices = Object.freeze({
  getUserByField,
  createUser,
  updateUser,
  getUserById,
});

async function getUserByField(objQuery) {
  let user = await User.findOne(objQuery);
  user = user ? user.toObject() : user;
  if (user) user._id = user._id.toString();
  return user;
}

async function getUserById(id) {
  let user = await User.findById(id);
  user = user ? user.toObject() : user;
  if (user) user._id = user._id.toString();
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
  return updatedUser.toObject();
}
