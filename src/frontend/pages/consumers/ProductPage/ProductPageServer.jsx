import { cookies } from "next/headers";
import ProductPage from "./ProductPage";
import itemsControllers from "@/backend/entities/items";
import { notFound } from "next/navigation";
import { commentServices } from "@/backend/entities/comments/data-access/comment.services";

const getItem = async id => {
  try {
    const { item } = await itemsControllers.getItemById(id);
    if (!item) return undefined;
    return item;
  } catch (error) {
    return undefined;
  }
};

const getComments = async id => {
  const comments = await commentServices.getComments({ itemId: id });
  return comments;
};

const ProductPageServer = async ({ params }) => {
  const { id } = params;
  const item = await getItem(id);
  if (!item) notFound();
  const comments = await getComments(id);
  const token = cookies().get("token")?.value;

  return (
    <ProductPage
      params={params}
      token={token}
      item={item}
      comments={comments}
    />
  );
};

export default ProductPageServer;
