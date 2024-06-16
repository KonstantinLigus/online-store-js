import { NextResponse } from "next/server";
import { getError } from "./getErrorObj";
import { redirectToPage } from "../libs/next";

export function getTryCatchWrapper(callback) {
  return async function (...args) {
    try {
      const { status, redirectTo, ...data } = await callback(...args);
      if (redirectTo) return redirectToPage(redirectTo);
      return NextResponse.json(data, { status });
    } catch (err) {
      const { status, ...error } = getError(err);
      return NextResponse.json(error, { status });
    }
  };
}
