import { NextResponse } from "next/server";
import { commentServices } from "../data-access/comment.services";

export async function getCommentsEntry() {
  const comments = await commentServices.getComments();
  return NextResponse.json(comments, { status: 200 });
}
