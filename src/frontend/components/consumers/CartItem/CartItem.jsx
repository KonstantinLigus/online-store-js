import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CartItem.module.scss";
import minusIcon from "public/assets/icon/icons-minus.png";
import plusIcon from "public/assets/icon/icons-plus.svg";
import { useCart } from "@/hooks/useCart";

const CartItem = ({
  id,
  title,
  price,
  mainImage,
  measurement,
  className,
  measure,
  quantity,
  children,
}) => {
  const [measureCurrent, setMeasureCurrent] = useState(measure);
  const [quantityCurrent, setQuantityCurrent] = useState(quantity);

  const { updateCartItem } = useCart();

  const updateMeasure = index => {
    setMeasureCurrent(index);
    updateCartItem(id, index, quantityCurrent);
  };

  console.log(measurement);

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
        {/* 
        <p className={styles.price}>{price} грн</p>
        <p className={styles.measure}>за 100 грам</p>
        */}
        <div className={styles.measure}>
          {measurement.values.map((item, index) => (
            <div key={index}>
              <input
                type="radio"
                name={id}
                id={index + id}
                className={styles.measureRadioBtn}
                checked={index === measureCurrent}
                onChange={() => updateMeasure(index)}
              />
              <label htmlFor={index + id} className={styles.measureLabel}>
                {item}
                {measurement.unit}
              </label>
            </div>
          ))}
        </div>

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
            <p className={styles.amountMeasure}>{quantityCurrent}</p>
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

      <h3 className={styles.sum}>
        {price[measureCurrent] * quantityCurrent} грн
      </h3>

      <div>{children}</div>
    </li>
  );
};

export default CartItem;
