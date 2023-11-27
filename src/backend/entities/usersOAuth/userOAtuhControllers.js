import { userOAuthServices } from "./userOAuthServices";

export const userOAuthControllers = Object.freeze({
  getUserById,
  getUserByField,
  createUser,
});

async function getUserByField(objQuery) {
  const user = await userOAuthServices.getUserByField(objQuery);
  return { user, status: 200 };
}

async function getUserById(id) {
  const user = await userOAuthServices.getUserById(id);
  return { user, status: 200 };
}

async function createUser(userObj) {
  const user = await userOAuthServices.createUser(userObj);
  return { user, status: 201 };
}
