import React from "react";
import Link from "next/link";
import styles from "./ProductItem.module.scss";
import Image from "next/image";

const ProductItem = ({ id, title, description, price, mainImage }) => {
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
        <p className={styles.price}>{price}</p>
      </div>
      <button className={styles.button}>До кошика</button>
    </li>
  );
};

export default ProductItem;
