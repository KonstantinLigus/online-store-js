"use server";

import { NextResponse } from "next/server";
import { ParseError } from "@/backend/helpers/errors";
import { updateUserSchema } from "@/backend/libs/zod";
import { updateUser } from "../domain/updateUser-use-case";
import { getError } from "@/backend/helpers";

export async function updateUserEntry(req) {
  try {
    const userData = await req.json();
    // Object.values(userData).forEach(field => {
    //   if (userData[field] === "") delete userData[field];
    // });
    const result = updateUserSchema.safeParse(userData);
    if (!result.success) throw new ParseError(result.error);
    const updatedUser = await updateUser(userData);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    const { error, status } = getError(err);
    return NextResponse.json(error, { status });
  }
}
