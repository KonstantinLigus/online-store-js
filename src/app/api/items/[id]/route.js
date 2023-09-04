import tryCatchWrapper from "@/backend/helpers/tryCatchWrapper";
import getItemsControllers from "@/backend/items";

export async function GET(req, { params: { id } }) {
  const itemsControllers = await getItemsControllers();
  return await tryCatchWrapper(itemsControllers.getItemById, { id });
}
