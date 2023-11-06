import { NextResponse } from "next/server";
import getItemsController from "@/backend/entities/items";

export async function getItemById(req, { params: { id } }) {
  const getItemById = getItemsController("GET_ONE_ITEM");
  const res = await getItemById(id);
  return NextResponse.json(res, { status: res.status });
}
