import { NextResponse } from "next/server";
import { commentServices } from "../data-access/comment.services";

export async function getCommentsEntry(req, { params: { id } }) {
  const comments = await commentServices.getComments({ itemId: id });
  return NextResponse.json(comments, { status: 200 });
}
