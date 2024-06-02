"use server";

import { signUp } from "@/backend/entities/users/domain/signUp-use-case";
import { compareStrings, getError } from "@/backend/helpers";
import { ParseError, PasswordsNotTheSameError } from "@/backend/helpers/errors";
import { redirectToPage } from "@/backend/libs/next";
import { userSignUpZodSchema } from "@/backend/libs/zod";
import { NextResponse } from "next/server";

export default async function signUpEntry(req) {
  let isUserCreated = null;
  try {
    const newUser = await req.json();
    const result = userSignUpZodSchema.safeParse(newUser);
    if (!result.success)
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    const { password, passwordRepeat } = newUser;
    const isPaswdsTheSame = compareStrings(password, passwordRepeat);
    if (!isPaswdsTheSame)
      return NextResponse.json(
        { error: { password: "Passwords don't match!" } },
        { status: 400 },
      );

    isUserCreated = await signUp(newUser);
  } catch (err) {
    return getError(err).error;
  }
  if (isUserCreated) redirectToPage("/account");
}
