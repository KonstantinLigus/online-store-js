import { itemsServices } from "./itemsServices";

export const itemsControllers = Object.freeze({
  getItemById,
  getAllItemsByField,
  getAllItemsWithAllFieldsByField,
  getAllItemsByIds,
});

async function getAllItemsWithAllFieldsByField({ objQuery, skip, limit }) {
  const items = await itemsServices.getAllItemsWithAllFieldsByField({
    objQuery,
    skip,
    limit,
  });
  return { items, status: 200 };
}
async function getAllItemsByField({ objQuery, skip, limit }) {
  const items = await itemsServices.getAllItemsByField({
    objQuery,
    skip,
    limit,
  });
  return { items, status: 200 };
}

async function getAllItemsByIds(ids) {
  const items = await itemsServices.GetAllItemsByIds(ids);
  return { items, status: 200 };
}

async function getItemById(id) {
  // const item = (await itemsServices.getItemById(id)).toObject({
  //   flattenMaps: true,
  // });
  // item._id = item._id.valueOf();
  const item = await itemsServices.getItemById(id);
  return { item, status: 200 };
}
