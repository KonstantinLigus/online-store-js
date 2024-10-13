import { cookies } from "next/headers";
import ProductPage from "./ProductPage";

const ProductPageServer = ({ params }) => {
  const token = cookies().get("token")?.value;

  return <ProductPage params={params} token={token} />;
};

export default ProductPageServer;
