import tryCatchWrapper from "@/backend/helpers/tryCatchWrapper";
import getItemsControllers from "@/backend/items";

export async function GET() {
  const itemsControllers = await getItemsControllers();
  return await tryCatchWrapper(itemsControllers.getAllItems);
}
