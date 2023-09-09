import { NextResponse } from "next/server";

export async function getClientTryCatchWrapper(callback) {
  return async function (args) {
    try {
      const { status, ...response } = await callback(args);
      return NextResponse.json(response, { status });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
  };
}
