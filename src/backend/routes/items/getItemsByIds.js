import itemsControllers from "@/backend/entities/items";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

export async function getItemsByIds(req) {
  const { searchParams } = new URL(req.url);
  const ids = searchParams.getAll("id");

  const data = await itemsControllers.getAllItemsByIds(ids);
  return data;
}

export default getTryCatchWrapper(getItemsByIds);
