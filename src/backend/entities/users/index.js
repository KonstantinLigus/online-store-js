import { getUserControllers } from "./getUserControllers";
import { getTryCatchWrapper } from "./helpers";

export default async function getUserController(method) {
  const userControllers = await getUserControllers();
  switch (method) {
    case "GET_USER_BY_FIELD":
      return await getTryCatchWrapper(userControllers.getUserByField);
    case "GET_USER_BY_ID":
      return await getTryCatchWrapper(userControllers.getUserById);
    case "CREATE_USER":
      return await getTryCatchWrapper(userControllers.createUser);
  }
}
