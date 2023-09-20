import { getItemsControllers } from "./getItemsControllers";
import { getClientTryCatchWrapper, getServerTryCatchWrapper } from "./helpers";

export default async function getItemsController(method) {
  const itemsControllers = await getItemsControllers();
  switch (method) {
    case "GET_FILTERED_ITEMS_ON_SERVER":
      return await getServerTryCatchWrapper(
        itemsControllers.getAllItemsByField,
      );
    case "GET_FILTERED_ITEMS_ON_CLIENT":
      return await getClientTryCatchWrapper(
        itemsControllers.getAllItemsByField,
      );
    case "GET_ONE_ITEM_ON_SERVER":
      return await getServerTryCatchWrapper(itemsControllers.getItemById);
    case "GET_ONE_ITEM_ON_CLIENT":
      return await getClientTryCatchWrapper(itemsControllers.getItemById);
  }
}
