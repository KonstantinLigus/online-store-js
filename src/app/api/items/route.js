import getItemsController from "@/backend/items";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const getfilteredItems = await getItemsController(
    "GET_FILTERED_ITEMS_ON_CLIENT",
  );
  if (category) {
    return await getfilteredItems({ category });
  }
  if (!category) {
    return await getfilteredItems({});
  }
}
