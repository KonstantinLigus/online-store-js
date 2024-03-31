import { ParseError } from "@/backend/helpers/errors";
import { NextResponse } from "next/server";
import { getError } from "@/backend/helpers";
import {
  orderDeliveryInfoByCourierSchema,
  orderDeliveryInfoToPostOfficeSchema,
} from "@/backend/libs/zod";
import { createOrderCase } from "../domain";

export async function createOrderEntry(req) {
  try {
    const newOrder = await req.json();

    if (!newOrder.deliveryInfo)
      throw new ParseError("deliveryInfo doesn't exist!");
    let result = null;
    if (newOrder.deliveryInfo.deliveryType === "Нова Пошта - Відділення")
      result = orderDeliveryInfoToPostOfficeSchema.safeParse(newOrder);
    if (newOrder.deliveryInfo.deliveryType === "Нова Пошта - доставка кур’єром")
      result = orderDeliveryInfoByCourierSchema.safeParse(newOrder);
    if (!result.success) throw new ParseError(result.error);

    const createdOrder = await createOrderCase(newOrder);
    return NextResponse.json(createdOrder, { status: 201 });
  } catch (err) {
    const { error, status } = getError(err);
    return NextResponse.json(error, { status });
  }
}
