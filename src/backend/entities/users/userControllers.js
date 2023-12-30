import { userServices } from "./userServices";

export const userControllers = Object.freeze({
  getUserByField,
  createUser,
  updateUser,
});

async function getUserByField(objQuery) {
  const user = await userServices.getUserByField(objQuery);
  return { user, status: 200 };
}

async function createUser(userObj) {
  const data = await userServices.createUser(userObj);
  const user = data.toObject();
  return { user, status: 201 };
}

async function updateUser(filter, updateObj) {
  const data = await userServices.updateUser(filter, updateObj);
  const updatedUser = data.toObject();
  return { user: updatedUser, status: 200 };
}
