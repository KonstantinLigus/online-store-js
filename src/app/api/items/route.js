import getItemsController from "@/backend/items";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categories = searchParams.get("category");
  const getAllItems = await getItemsController("GET_ALL_ITEMS_ON_CLIENT");
  return await getAllItems({ categories });
}
