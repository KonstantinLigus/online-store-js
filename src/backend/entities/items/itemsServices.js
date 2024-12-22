import "@/backend/db/connectDB";
import { Item } from "./item.schema";

export const itemsServices = Object.freeze({
  getItemById,
  getAllItemsByField,
  getAllItemsWithAllFieldsByField,
});

async function getAllItemsWithAllFieldsByField({ objQuery, skip, limit }) {
  const items = await Item.find(objQuery).skip(skip).limit(limit);
  return items;
}

async function getAllItemsByField({ objQuery, skip, limit }) {
  const items = await Item.find(objQuery)
    .select("title prices mainImage")
    .skip(skip)
    .limit(limit);
  return items;
}

async function getItemById(id) {
  const item = await Item.findById(id).lean();
  return item;
}
