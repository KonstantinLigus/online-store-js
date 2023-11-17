"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Order.module.scss";

const OrderedProduct = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imgContainer}>
        <Image
          className={styles.itemImage}
          src={item.mainImage}
          alt={item.title}
          priority
          fill
        />
      </div>
      <div>
        <p style={{ textTransform: "capitalize" }}>{item.title}</p>
        <p>
          {item.prices[item.measure].value} {item.prices[item.measure].unit}
        </p>
        <p>Кількість: {item.quantity}</p>
      </div>
    </div>
  );
};
export default OrderedProduct;
