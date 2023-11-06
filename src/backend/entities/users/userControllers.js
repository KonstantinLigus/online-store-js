import { userServices } from "./userServices";

export const userControllers = Object.freeze({
  getUserById,
  getUserByField,
  createUser,
});

async function getUserByField(objQuery) {
  const user = await userServices.getUserByField(objQuery);
  return { user, status: 200 };
}

async function getUserById(id) {
  const user = await userServices.getUserById(id);
  return { user, status: 200 };
}

async function createUser(userObj) {
  const user = await userServices.createUser(userObj);
  return { user, status: 201 };
}