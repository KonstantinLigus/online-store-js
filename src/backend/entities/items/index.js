import { itemsControllers } from "./itemsControllers";
import { getTryCatchWrapper } from "./helpers";

export default function getItemsController(method) {
  switch (method) {
    case "GET_FILTERED_ITEMS":
      return getTryCatchWrapper(itemsControllers.getAllItemsByField);
    case "GET_ONE_ITEM":
      return getTryCatchWrapper(itemsControllers.getItemById);
  }
}
