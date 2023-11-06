import { NextResponse } from "next/server";
import getItemsController from "@/backend/entities/items";

export async function getFilteredItems(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const getfilteredItems = getItemsController("GET_FILTERED_ITEMS");
  let res = [];
  if (category) {
    res = await getfilteredItems({ category });
  }
  if (!category) {
    res = await getfilteredItems({});
  }
  return NextResponse.json(res, { status: res.status });
}
