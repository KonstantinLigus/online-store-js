"use client";
import "@/global-styles/globals.css";
import React from "react";
import Image from "next/image";
import styles from "./Order.module.scss";

const OrderedProduct = ({ item, allProducts }) => {
  let currentProduct = allProducts.find(p => p._id === item._id);
  return (
    currentProduct && (
      <div className={styles.item}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.itemImage}
            src={currentProduct.mainImage}
            alt={currentProduct.title}
            priority
            fill
          />
        </div>
        <div>
          <p style={{ textTransform: "capitalize" }}>{currentProduct.title}</p>
          <p>{item.value}</p>
          <p>Кількість: {item.quantity}</p>
        </div>
      </div>
    )
  );
};
export default OrderedProduct;
