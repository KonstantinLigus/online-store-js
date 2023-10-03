import { getItemsControllers } from "./getItemsControllers";
import { getTryCatchWrapper } from "./helpers";

export default async function getItemsController(method) {
  const itemsControllers = await getItemsControllers();
  switch (method) {
    case "GET_FILTERED_ITEMS":
      return await getTryCatchWrapper(itemsControllers.getAllItemsByField);
    case "GET_ONE_ITEM":
      return await getTryCatchWrapper(itemsControllers.getItemById);
  }
}
