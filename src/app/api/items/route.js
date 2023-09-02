import { getItemsControllers } from "@/backend/items";

export async function GET() {
  const itemsControllers = await getItemsControllers();
  return await itemsControllers.getAllItems();
}
