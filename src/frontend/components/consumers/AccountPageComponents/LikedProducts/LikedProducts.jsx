"use client";
import React, { useState, useEffect } from "react";
import styles from "./LikedProducts.module.scss";
import { useLike } from "@/hooks/useLike";
import Product from "./Product";
import Image from "next/image";

const LikedProducts = () => {
  const { liked } = useLike();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/items");
      const { items } = await res.json();
      setData(items);
    };
    fetchData();
  }, []);

  return (
    <>
      {liked && (
        <>
          <details className={styles.details} open>
            <summary className={styles.summary}>
              <span>Вподобані продукти</span>
              <Image
                src="/assets/icon/icon-angle-down.svg"
                alt="heart icon"
                width={24}
                height={24}
                className={styles.angleIcon}
              />
            </summary>
            <div className={styles.products}>
              {data
                .filter(i => liked.includes(i._id))
                .map(product => (
                  <Product item={product} key={product._id} />
                ))}
            </div>
          </details>
        </>
      )}
    </>
  );
};
export default LikedProducts;
