import { NextResponse } from "next/server";
import { commentServices } from "../data-access/comment.services";

export async function getCommentsEntry(req) {
  const page = Number(req.nextUrl.searchParams.get("page")) || 1;
  const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;

  const comments = await commentServices.getComments({ skip: page, limit });
  return NextResponse.json(comments, { status: 200 });
}
