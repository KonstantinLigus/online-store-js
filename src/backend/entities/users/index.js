import { userControllers } from "./userControllers";
import { getTryCatchWrapper } from "./helpers";

export default function getUserController(method) {
  switch (method) {
    case "GET_USER_BY_FIELD":
      return getTryCatchWrapper(userControllers.getUserByField);
    case "GET_USER_BY_ID":
      return getTryCatchWrapper(userControllers.getUserById);
    case "CREATE_USER":
      return getTryCatchWrapper(userControllers.createUser);
  }
}
