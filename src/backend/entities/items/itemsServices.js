import "@/backend/db/connectDB";
import { Item } from "./item.schema";

export const itemsServices = Object.freeze({
  getItemById,
  getAllItemsByField,
  getAllItemsWithAllFieldsByField,
});

async function getAllItemsWithAllFieldsByField(objQuery) {
  const items = await Item.find(objQuery);
  return items;
}

async function getAllItemsByField(objQuery) {
  const items = await Item.find(objQuery).select("title prices mainImage");
  return items;
}

async function getItemById(id) {
  const item = await Item.findById(id);
  return item;
}
