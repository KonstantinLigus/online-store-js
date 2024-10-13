import { NextResponse } from "next/server";
import { commentServices } from "../data-access/comment.services";

export async function getCommentsEntry(req) {
  const itemId = req.nextUrl.searchParams.get("itemId");

  const comments = await commentServices.getComments({ itemId });
  return NextResponse.json(comments, { status: 200 });
}
