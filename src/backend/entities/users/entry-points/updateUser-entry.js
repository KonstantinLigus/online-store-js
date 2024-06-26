"use server";

import { NextResponse } from "next/server";
import { ParseError } from "@/backend/helpers/errors";
import { updateUserSchema } from "@/backend/libs/zod";
import { getError } from "@/backend/helpers";
import { getUserIdFromNextAuth } from "../domain/getUserIdFromNextAuth-use-case";
import { redirectToPage } from "@/backend/libs/next";
import { getUserIdFromToken } from "../domain/getUserIdFromToken-use-case";
import { updateUser } from "../domain/updateUser-use-case";

export async function updateUserEntry(req) {
  try {
    const userData = await req.json();

    for (const field of Object.keys(userData)) {
      if (userData[field] === "") delete userData[field];
    }

    // const result = updateUserSchema.safeParse(userData);
    // if (!result.success) throw new ParseError(result.error);

    const userId =
      (await getUserIdFromNextAuth()) || (await getUserIdFromToken());
    if (!userId) redirectToPage("/login");

    const updatedUser = await updateUser(userId, userData);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    const { error, status } = getError(err);
    return NextResponse.json(error, { status });
  }
}
