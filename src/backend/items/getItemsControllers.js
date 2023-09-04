import { NextRequest, NextResponse } from "next/server";
import { getItemsServices } from "./getItemsServices";

export async function getItemsControllers() {
  const itemsServices = await getItemsServices();

  return Object.freeze({ getAllItems, getItemById });

  async function getAllItems() {
    const items = await itemsServices.getAllItems();
    return { items, status: 200 };
  }
  async function getItemById({ id }) {
    const item = await itemsServices.getItemById(id);
    return { item, status: 200 };
  }
}
