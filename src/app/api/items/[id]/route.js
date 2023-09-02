import { getItemsControllers } from "@/backend/items";

export async function GET(req, { params: { id } }) {
  const itemsControllers = await getItemsControllers();
  return await itemsControllers.getItemById(id);
}
