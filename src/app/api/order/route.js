import authOptions from "@/app/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const session = await getServerSession(authOptions);
  console.log(session.user._id.toString());
  return NextResponse.json(session);
}
