import { getError } from "@/backend/helpers";
import { NextResponse } from "next/server";
import { orderServices } from "../data-access/orderServices";

export async function getOrdersEntry(req) {
  try {
    const owner = req.nextUrl.searchParams.get("owner");
    const orders = await orderServices.getOrdersByField({ owner });
    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    const { error, status } = getError(err);
    return NextResponse.json(error, { status });
  }
}
