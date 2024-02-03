import itemsControllers from "@/backend/entities/items";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

export async function getFilteredItems(req) {
  const { searchParams } = new URL(req.url);

  let objQuery = {};
  if (searchParams.size !== 0)
    searchParams.forEach((value, key) =>
      Object.assign(objQuery, { [key]: new RegExp(value, "i") }),
    );

  const data = await itemsControllers.getAllItemsByField(objQuery);
  return data;
}

export default getTryCatchWrapper(getFilteredItems);
