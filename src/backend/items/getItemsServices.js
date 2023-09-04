import connectDB from "../db/connectDB";
import { Item } from "./item.schema";

export function getItemsServices() {
  connectDB();

  return Object.freeze({ getAllItems, getItemById });

  async function getAllItems() {
    const items = await Item.find({});
    return items;
  }
  async function getItemById(id) {
    const item = await Item.findById(id);
    return item;
  }
}
