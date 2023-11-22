import itemsControllers from "@/backend/entities/items";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

export async function getFilteredItems(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  let data = [];
  if (category) {
    data = await itemsControllers.getAllItemsByField({ category });
  }
  if (!category) {
    data = await itemsControllers.getAllItemsByField({});
  }
  return data;
}

export default getTryCatchWrapper(getFilteredItems);
