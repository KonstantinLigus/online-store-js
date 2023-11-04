import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./ProductItem.module.scss";

const ProductItem = ({ id, title, prices, mainImage, children }) => {
  return (
    <li className={styles.item}>
      <Link href={`${id}`}>
        <Image
          className={styles.cardImage}
          src={mainImage}
          alt={title}
          width={140}
          height={140}
          priority
        />
      </Link>
      <div className={styles.information}>
        <Link href={`${id}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <div className={styles.priceContainer}>
          {prices[0].actionPrice ? (
            <>
              <p className={styles.actionPrice}>
                <span>{prices[0].price} грн</span>
                {prices[0].actionPrice} грн
              </p>
            </>
          ) : (
            <p className={styles.price}>{prices[0].price} грн</p>
          )}

          <p className={styles.unit}>
            {prices[0].value} {prices[0].unit}
          </p>
        </div>
      </div>
      <div>{children}</div>
    </li>
  );
};

export default ProductItem;
