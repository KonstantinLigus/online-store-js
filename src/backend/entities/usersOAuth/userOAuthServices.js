import "@/backend/db/connectDB";
import { UserOAuth } from "./userOAuth.schema";

export const userOAuthServices = Object.freeze({
  getUserByField,
  getUserById,
  createUser,
});

async function getUserByField(objQuery) {
  const user = await UserOAuth.findOne(objQuery);
  return user;
}

async function getUserById(id) {
  const user = await UserOAuth.findById(id);
  return user;
}

async function createUser(userObj) {
  const user = await UserOAuth.create(userObj);
  return user;
}
