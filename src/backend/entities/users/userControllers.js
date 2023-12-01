import { userServices } from "./userServices";

export const userControllers = Object.freeze({
  getUserByField,
  createUser,
});

async function getUserByField(objQuery) {
  const data = await userServices.getUserByField(objQuery);
  const user = data ? data.toObject() : data;
  return { user, status: 200 };
}

async function createUser(userObj) {
  const data = await userServices.createUser(userObj);
  const user = data.toObject();
  return { user, status: 201 };
}
