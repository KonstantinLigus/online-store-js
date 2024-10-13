import itemsControllers from "@/backend/entities/items";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

export async function getFilteredItems(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (parseInt(page) - 1) * limit;

  let objQuery = {};
  if (searchParams.size !== 0)
    searchParams.forEach((value, key) =>
      Object.assign(objQuery, { [key]: new RegExp(value, "i") }),
    );

  const data = await itemsControllers.getAllItemsWithAllFieldsByField({
    objQuery,
    skip,
    limit,
  });
  return data;
}

export default getTryCatchWrapper(getFilteredItems);
