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

  const hoverTrashIcoon = e => {
    e.target.src = "/assets/icon/icon-trash-fill.svg";
  };
  const initialTrashIcoon = e => {
    e.target.src = "/assets/icon/icon-trash.svg";
  };

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <Link href={`${item._id}`}>
          <div className={styles.imgContainer}>
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
                  hidden
                />
                <label
                  htmlFor={index + item._id}
                  className={styles.measureLabel}
                >
                  {i.value} {i.unit}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.price}>
        <div className={styles.counter}>
          <button
            type="button"
            className={styles.counterButton}
            onClick={() => decreaseQuantity()}
          >
            <Image
              src="/assets/icon/icon-minus.svg"
              width={12}
              height={12}
              alt="minus"
              priority
            />
          </button>
          <p className={styles.counterValue}>{quantityCurrent}</p>
          <button
            type="button"
            className={styles.counterButton}
            onClick={() => increaseQuantity()}
          >
            <Image
              src="/assets/icon/icon-plus.svg"
              width={12}
              height={12}
              alt="plus"
              priority
            />
          </button>
        </div>

        {item.prices[measureCurrent].actionPrice ? (
          <p className={styles.actionSum}>
            <span>
              {item.prices[measureCurrent].price * quantityCurrent} грн
            </span>
            {item.prices[measureCurrent].actionPrice * quantityCurrent} грн
          </p>
        ) : (
          <p className={styles.sum}>
            {item.prices[measureCurrent].price * quantityCurrent} грн
          </p>
        )}
      </div>

      <Image
        className={styles.deleteIcon}
        src="/assets/icon/icon-trash.svg"
        alt="delete-icon"
        onClick={() => removeFromCart(item._id)}
        width={20}
        height={20}
        onMouseOver={hoverTrashIcoon}
        onMouseLeave={initialTrashIcoon}
      />
    </li>
  );
};

export default CartItem;
