import { getItemsServices } from "./getItemsServices";

export async function getItemsControllers() {
  const itemsServices = await getItemsServices();

  return Object.freeze({ getItemById, getAllItemsByField });

  async function getAllItemsByField(objQuery) {
    const items = await itemsServices.getAllItemsByField(objQuery);
    const serializedItems = items.map(({ _id, title, price, mainImage }) => ({
      _id: _id.toString(),
      title,
      price,
      mainImage,
    }));
    return { items: serializedItems, status: 200 };
  }

  async function getItemById(id) {
    const item = await itemsServices.getItemById(id);
    return { item, status: 200 };
  }
}
