import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductItem.module.scss";
import LikeIcon from "../LikeIcon/LikeIcon";
import { useCart } from "@/hooks/useCart";

const ProductItem = ({ id, title, prices, mainImage, children }) => {
  return (
    <li className={styles.product}>
      <div className={styles.product__picture}>
        <Link href={`/${id}`}>
          <Image
            className={styles.product__image}
            src={mainImage}
            alt={title}
            width={300}
            height={300}
            priority
          />
        </Link>
        <div className={styles.product__like}>
          <LikeIcon productId={id} />
        </div>
      </div>
      <Link href={`/${id}`} className={styles.product__title}>
        {title}
      </Link>
      <div className={styles.price}>
        {prices[0].actionPrice ? (
          <>
            <p className={styles.price__actionPrice}>
              <span>{prices[0].price} грн</span>
              {prices[0].actionPrice} грн
            </p>
          </>
        ) : (
          <p className={styles.price__normalPrice}>{prices[0].price} грн</p>
        )}

        <p className={styles.price__unit}>
          {prices[0].value} {prices[0].unit}
        </p>
      </div>
      <div>{children}</div>
    </li>
  );
};

export default ProductItem;
