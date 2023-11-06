import { itemsServices } from "./itemsServices";

export const itemsControllers = Object.freeze({
  getItemById,
  getAllItemsByField,
});

async function getAllItemsByField(objQuery) {
  const items = await itemsServices.getAllItemsByField(objQuery);
  return { items, status: 200 };
}

async function getItemById(id) {
  const item = await itemsServices.getItemById(id);
  return { item, status: 200 };
}
