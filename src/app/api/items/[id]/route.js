import getItemsController from "@/backend/items";

export async function GET(req, { params: { id } }) {
  const getItemById = await getItemsController("GET_ONE_ITEM_ON_CLIENT");
  return await getItemById(id);
}
