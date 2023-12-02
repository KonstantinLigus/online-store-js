import itemsControllers from "@/backend/entities/items";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";

async function getItemById(req, { params: { id } }) {
  const data = await itemsControllers.getItemById(id);
  return data;
}

export default getTryCatchWrapper(getItemById);
