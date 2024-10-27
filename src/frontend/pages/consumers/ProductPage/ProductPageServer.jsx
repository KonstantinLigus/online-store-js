import { cookies } from "next/headers";
import ProductPage from "./ProductPage";
import itemsControllers from "@/backend/entities/items";
import { notFound } from "next/navigation";

const getItem = async id => {
  try {
    const { item } = await itemsControllers.getItemById(id);
    if (!item) return undefined;
    return item.toObject();
  } catch (error) {
    return undefined;
  }
};

const ProductPageServer = async ({ params }) => {
  const item = await getItem(params.id);
  if (!item) notFound();
  const token = cookies().get("token")?.value;

  return <ProductPage params={params} token={token} item={item} />;
};

export default ProductPageServer;
