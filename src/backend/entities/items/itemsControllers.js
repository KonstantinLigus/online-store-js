import { itemsServices } from "./itemsServices";

export const itemsControllers = Object.freeze({
  getItemById,
  getAllItemsByField,
  getAllItemsWithAllFieldsByField,
});

async function getAllItemsWithAllFieldsByField(objQuery) {
  const items = await itemsServices.getAllItemsWithAllFieldsByField(objQuery);
  return { items, status: 200 };
}
async function getAllItemsByField(objQuery) {
  const items = await itemsServices.getAllItemsByField(objQuery);
  return { items, status: 200 };
}

async function getItemById(id) {
  const item = await itemsServices.getItemById(id);
  return { item, status: 200 };
}
