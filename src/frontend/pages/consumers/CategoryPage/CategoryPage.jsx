"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoryPage.module.scss";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";

const CategoryPage = ({ params }) => {
  const allCategories = {
    vegetables: "овочі",
    fruits: "фрукти та ягоди",
    nuts: "горіхи",
    grocery: "бакалія",
    conservation: "консервація",
    milk: "молоко",
  };
  const currentCategory = allCategories[params.name];

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("../api/items");
      const { items } = await res.json();
      console.log(items);
      setData(items);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>{currentCategory}</h2>

      <div className={styles.products}>
        {data.map(item => (
          <ProductItem
            key={`/${item._id}`}
            id={`/${item._id}`}
            title={item.title}
            price={item.price}
            mainImage={item.mainImage}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
