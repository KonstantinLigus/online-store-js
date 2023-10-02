"use client";

import styles from "./CategoryOrProduct.module.scss";
import CategoryPage from "../../../components/consumers/CategoryPage/CategoryPage";
import ProductPage from "../../../components/consumers/ProductPage/ProductPage";

const CategoryOrProduct = ({ params }) => {
  const pageURL = params.id;
  const categories = [
    "vegetables",
    "fruits",
    "nuts",
    "grocery",
    "conservation",
    "milk",
  ];

  return (
    <>
      {categories.includes(pageURL) ? (
        <CategoryPage category={pageURL} />
      ) : (
        <ProductPage product={pageURL} />
      )}
    </>
  );
};

export default CategoryOrProduct;
