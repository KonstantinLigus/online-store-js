import { getNotFoundUserError } from "./getErrorObj";

export async function getTryCatchWrapper(callback) {
  return async function (...args) {
    try {
      const res = await callback(...args);
      return res;
    } catch (error) {
      return getNotFoundUserError(error);
    }
  };
}
