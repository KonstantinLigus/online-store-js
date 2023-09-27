import { NextResponse } from "next/server";
import { getNotFoundItemError } from "./getErrorObj";

export async function getClientTryCatchWrapper(callback) {
  return async function (args) {
    try {
      const res = await callback(args);
      return NextResponse.json(res);
    } catch (error) {
      if (error.kind === "ObjectId") {
        return NextResponse.json(getNotFoundItemError(error.value));
      }
    }
  };
}
