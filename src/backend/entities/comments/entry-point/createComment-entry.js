import { getError } from "@/backend/helpers";
import { ParseError } from "@/backend/helpers/errors";
import { commentCreateZodSchema } from "@/backend/libs/zod";
import { NextResponse } from "next/server";
import { createCommentCase } from "../domain/createComment-use-case";

export async function createCommentEntry(req) {
  try {
    const newComment = await req.json();

    const result = commentCreateZodSchema.safeParse(newComment);
    if (!result.success) throw new ParseError(result.error);
    const createdComment = await createCommentCase(newComment);
    return NextResponse.json(createdComment, { status: 201 });
  } catch (err) {
    const { error, status } = getError(err);
    return NextResponse.json(error, { status });
  }
}
