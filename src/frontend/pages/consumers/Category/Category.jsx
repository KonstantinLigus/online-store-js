"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Category.module.scss";
import Image from "next/image";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";

const Category = ({ params }) => {
  const allCategories = {
    vegetables: "овочі",
    fruits: "фрукти та ягоди",
    nuts: "горіхи",
    grocery: "бакалія",
    conservation: "консервація",
    milk: "молоко",
  };

  const currentCategory = allCategories[params.category];

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/items");
      const { items } = await res.json();
      setData(items);
      console.log(items);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className={styles.title}>{currentCategory}</h2>
      <div className={styles.products}>
        {data.map(item => (
          <Link href={`/${params.category}/${item._id}`} key={item._id}>
            <ProductItem
              title={item.title}
              price={item.price}
              mainImage={item.mainImage}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
