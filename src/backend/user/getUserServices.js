import connectDB from "../db/connectDB";
import { User } from "./user.schema";

export async function getUserServices() {
  await connectDB();

  return Object.freeze({ getUserByField, getUserById, createUser });

  async function getUserByField(objQuery) {
    const user = await User.findOne(objQuery);
    return user;
  }

  async function getUserById(id) {
    const user = await User.findById(id);
    return user;
  }

  async function createUser(userObj) {
    const user = await User.create(userObj);
    return user;
  }
}
