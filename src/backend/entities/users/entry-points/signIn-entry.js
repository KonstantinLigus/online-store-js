"use server";

import { getError } from "@/backend/helpers";
import { redirectToPage } from "@/backend/libs/next";
import { userSignInZodSchema } from "@/backend/libs/zod";
import { NextResponse } from "next/server";
import { signInRouteHelper } from "../domain/signIn-route-use-case";
import { revalidatePath } from "next/cache";

export default async function signInRoute(req) {
  try {
    const user = await req.json();
    const result = userSignInZodSchema.safeParse(user);
    if (!result.success)
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    const isUserFromDB = await signInRouteHelper(user);
    if (isUserFromDB)
      return NextResponse.json({ revalidate: true, status: 200 });
  } catch (err) {
    const { error, status } = getError(err);
    return NextResponse.json({ error }, { status });
  }
}
