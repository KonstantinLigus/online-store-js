import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CartItem.module.scss";
import minusIcon from "public/assets/icon/icons-minus.png";
import plusIcon from "public/assets/icon/icons-plus.svg";

const CartItem = ({
  id,
  title,
  price,
  mainImage,
  unit,
  children,
  className,
}) => {
  return (
    <li className={`${styles.item} ${className}`}>
      <Link href={`${id}`}>
        <div className={styles.container}>
          <Image
            className={styles.cardImage}
            src={mainImage}
            alt={title}
            priority
            fill
          />
        </div>
      </Link>

      <div className={styles.information}>
        <Link href={`${id}`}>
          <h2 className={styles.title}>{title}</h2>
        </Link>
        <p className={styles.price}>{price} грн</p>
        <p className={styles.measure}>за 100 грам</p>

        <div className={styles.counter}>
          <div className={styles.amount}>
            <div className={styles.amountIconContainer}>
              <Image
                className={styles.amountIcon}
                src={minusIcon}
                alt="minus-icon"
                fill
              />
            </div>
            <p className={styles.amountMeasure}>{unit}</p>
            <div className={styles.amountIconContainer}>
              <Image
                className={styles.amountIcon}
                src={plusIcon}
                alt="plus-icon"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <h3 className={styles.sum}>100₴</h3>
      <div>{children}</div>
    </li>
  );
};

export default CartItem;
