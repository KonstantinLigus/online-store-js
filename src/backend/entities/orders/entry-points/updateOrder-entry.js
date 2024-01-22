import { getError } from "@/backend/helpers";
import { UpdateOrderError } from "@/backend/helpers/errors";
import { NextResponse } from "next/server";
import { updateOrderCase } from "../domain";

export async function updateOrderEntry(req) {
  try {
    const _id = req.nextUrl.searchParams.get("id");
    const updatedFields = await req.json();
    if (!_id || !updatedFields) throw new UpdateOrderError();
    const updatedOrder = await updateOrderCase({ _id, updatedFields });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (err) {
    const { error, status } = getError(err);
    return NextResponse.json(error, { status });
  }
}
