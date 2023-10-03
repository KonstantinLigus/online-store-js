import { NextResponse } from "next/server";
import getItemsController from "@/backend/items";

export async function GET(req, { params: { id } }) {
  const getItemById = await getItemsController("GET_ONE_ITEM");
  const res = await getItemById(id);
  return NextResponse.json(res, { status: res.status });
}
