import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CartItem.module.scss";

const CartItem = ({ item, removeFromCart, updateCartItem }) => {
  const [measureCurrent, setMeasureCurrent] = useState(item.measure);
  const [quantityCurrent, setQuantityCurrent] = useState(item.quantity);

  const updateMeasure = index => {
    setMeasureCurrent(index);
    updateCartItem(item, index, quantityCurrent);
  };

  const decreaseQuantity = () => {
    if (quantityCurrent > 1) {
      const quantity = quantityCurrent - 1;
      setQuantityCurrent(quantity);
      updateCartItem(item, measureCurrent, quantity);
    }
  };
  const increaseQuantity = () => {
    const quantity = quantityCurrent + 1;
    setQuantityCurrent(quantity);
    updateCartItem(item, measureCurrent, quantity);
  };

  return (
    <li className={styles.item}>
      <Link href={`${item._id}`}>
        <div className={styles.container}>
          <Image
            className={styles.cardImage}
            src={item.mainImage}
            alt={item.title}
            priority
            fill
          />
        </div>
      </Link>

      <div className={styles.information}>
        <Link href={`${item._id}`}>
          <h2 className={styles.title}>{item.title}</h2>
        </Link>
        <div className={styles.measure}>
          {item.prices.map((i, index) => (
            <div key={index}>
              <input
                type="radio"
                name={item._id}
                id={index + item._id}
                className={styles.measureRadioBtn}
                checked={index === measureCurrent}
                onChange={() => updateMeasure(index)}
              />
              <label htmlFor={index + item._id} className={styles.measureLabel}>
                {i.value} {i.unit}
              </label>
            </div>
          ))}
        </div>

        <div className={styles.counter}>
          <button
            type="button"
            className={styles.counterButton}
            onClick={() => decreaseQuantity()}
          >
            -
          </button>
          <p className={styles.counterValue}>{quantityCurrent}</p>
          <button
            type="button"
            className={styles.counterButton}
            onClick={() => increaseQuantity()}
          >
            +
          </button>
        </div>
      </div>

      {item.prices[measureCurrent].actionPrice ? (
        <>
          <p className={styles.actionSum}>
            <span>
              {item.prices[measureCurrent].price * quantityCurrent} грн
            </span>
            {item.prices[measureCurrent].actionPrice * quantityCurrent} грн
          </p>
        </>
      ) : (
        <p className={styles.sum}>
          {item.prices[measureCurrent].price * quantityCurrent} грн
        </p>
      )}

      <Image
        className={styles.deleteIcon}
        src="/assets/icon/cart-delete.svg"
        alt="delete-icon"
        onClick={() => removeFromCart(item._id)}
        width={20}
        height={20}
      />
    </li>
  );
};

export default CartItem;
