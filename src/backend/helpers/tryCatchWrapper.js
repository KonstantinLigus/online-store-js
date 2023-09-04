import { NextResponse } from "next/server";

export default async function tryCatchWrapper(callback, args) {
  try {
    const { status, ...response } = await callback(args);
    return NextResponse.json({ ...response }, { status });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
}
