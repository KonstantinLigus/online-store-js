import { NextResponse } from "next/server";
import { getNotFoundItemError } from "./getErrorObj";

export async function getClientTryCatchWrapper(callback) {
  return async function (args) {
    try {
      const { status, ...response } = await callback(args);
      return NextResponse.json(response, { status });
    } catch (error) {
      if (error.kind === "ObjectId") {
        return NextResponse.json(getNotFoundItemError(error.value));
      }
    }
  };
}
