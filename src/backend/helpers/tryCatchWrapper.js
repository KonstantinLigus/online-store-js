import { NextResponse } from "next/server";
import { getError } from "./getErrorObj";

export function getTryCatchWrapper(callback) {
  return async function (...args) {
    try {
      const { status, ...data } = await callback(...args);
      return NextResponse.json(data, { status });
    } catch (error) {
      const { status, ...errorData } = getError(error);
      return NextResponse.json(errorData, { status });
    }
  };
}
