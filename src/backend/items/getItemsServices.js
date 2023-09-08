import connectDB from "../db/connectDB";
import { Item } from "./item.schema";

export async function getItemsServices() {
  await connectDB();

  return Object.freeze({ getAllItems, getItemById, getAllItemsByField });

  async function getAllItems() {
    const items = await Item.find({}).select(
      "-description -images -categories"
    );
    return items;
  }
  async function getAllItemsByField(objQuery) {
    const items = await Item.find(objQuery).select(
      "-description -images -categories"
    );
    return items;
  }

  async function getItemById(id) {
    const item = await Item.findById(id);
    return item;
  }
}
