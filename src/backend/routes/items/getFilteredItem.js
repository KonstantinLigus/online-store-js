import itemsControllers from "@/backend/entities/items";
import { getTryCatchWrapper } from "@/backend/helpers/tryCatchWrapper";
import { sendEmail } from "@/backend/libs/send-grid/send-email";

export async function getFilteredItems(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  await sendEmail();
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
