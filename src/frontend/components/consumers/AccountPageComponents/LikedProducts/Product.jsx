"use client";
import React from "react";
import styles from "./LikedProducts.module.scss";
import Image from "next/image";
import Link from "next/link";
import LikeIcon from "../../LikeIcon/LikeIcon";

const Product = ({ item }) => {
  return (
    <div className={styles.productContainer}>
      <Link href={`${item._id}`}>
        <Image
          className={styles.cardImage}
          src={item.mainImage}
          alt={item.title}
          width={200}
          height={200}
          priority
        />
        <p className={styles.productTitle}>{item.title}</p>
      </Link>
      <div className={styles.heartIconContainer}>
        <LikeIcon productId={item._id} />
      </div>
    </div>
  );
};
export default Product;
