import React from "react";
import styles from "./ProductList.module.scss";
import getItemsController from "@/backend/items";
import ProductCard from "@/frontend/components/consumers/ProductCard/ProductCard";

const ProductList = async () => {
  const getFilterdItems = await getItemsController(
    "GET_FILTERED_ITEMS_ON_SERVER",
  );
  const { items } = await getFilterdItems({ categories: "популярні" });

  return (
    <div className={styles.productList}>
      <h2 className={styles.title}>Акційні товари</h2>
      <ul className={styles.list}>
        {items.map(item => (
          <ProductCard
            key={item._id}
            title={item.title}
            price={item.price}
            mainImage={item.mainImage}
          />
        ))}
      </ul>
      <p className={styles.navigation}>&lt; 1/5 &gt;</p>
    </div>
  );
};

export default ProductList;
