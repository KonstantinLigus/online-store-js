import connectDB from "../db/connectDB";
import { Item } from "./item.schema";

export async function getItemsServices() {
  await connectDB();

  return Object.freeze({ getItemById, getAllItemsByField });

  async function getAllItemsByField(objQuery) {
    const items = await Item.find(objQuery).select(
      "title price mainImage action measurement",
    );
    return items;
  }

  async function getItemById(id) {
    const item = await Item.findById(id);
    return item;
  }
}
