import { getOrderError } from "./getErrorObj";

export function getTryCatchWrapper(callback) {
  return async function (...args) {
    try {
      const res = await callback(...args);
      return res;
    } catch (error) {
      return getOrderError(error);
    }
  };
}
