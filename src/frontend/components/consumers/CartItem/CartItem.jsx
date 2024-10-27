import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./CartItem.module.scss";
import { useCart } from "@/hooks/useCart";

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
    <li className={styles.product}>
      <div className={styles.product__inner}>
        <Link href={`${item._id}`}>
          <div className={styles.picture}>
            <Image
              className={styles.picture__image}
              src={item.mainImage}
              alt={item.title}
              priority
              fill
            />
          </div>
        </Link>

        <div className={styles.info}>
          <div className={styles.info__first}>
            <Link href={`${item._id}`} className={styles.title}>
              <h2 className={styles.title__text}>{item.title}</h2>
            </Link>

            <div className={styles.measure}>
              {item.prices.map((i, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name={item._id}
                    id={index + item._id}
                    className={styles.measure__button}
                    checked={index === measureCurrent}
                    onChange={() => updateMeasure(index)}
                    hidden
                  />
                  <label
                    htmlFor={index + item._id}
                    className={styles.measure__label}
                  >
                    {i.value} {i.unit}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.info__second}>
            <div className={styles.counter}>
              <button
                type="button"
                className={styles.counter__button}
                onClick={() => decreaseQuantity()}
                style={{
                  maskImage: 'url("/assets/icon/icon-minus.svg")',
                  webkitMaskImage: 'url("/assets/icon/icon-minus.svg")',
                }}
              ></button>
              <p className={styles.counter__value}>{quantityCurrent}</p>
              <button
                type="button"
                className={styles.counter__button}
                onClick={() => increaseQuantity()}
                style={{
                  maskImage: 'url("/assets/icon/icon-plus.svg")',
                  webkitMaskImage: 'url("/assets/icon/icon-plus.svg")',
                }}
              ></button>
            </div>

            {item.prices[measureCurrent].actionPrice ? (
              <div className={styles.price}>
                <p className={styles.price__sale}>
                  {item.prices[measureCurrent].price * quantityCurrent} грн
                </p>
                <p
                  className={`${styles.price__normal} ${styles.price__normal_red}`}
                >
                  {item.prices[measureCurrent].actionPrice * quantityCurrent}{" "}
                  грн
                </p>
              </div>
            ) : (
              <p className={styles.price__normal}>
                {item.prices[measureCurrent].price * quantityCurrent} грн
              </p>
            )}
          </div>
        </div>

        <div className={styles.remove}>
          <Image
            className={styles.remove__icon}
            src="/assets/icon/icon-trash.svg"
            alt="remove"
            onClick={() => removeFromCart(item._id)}
            width={20}
            height={20}
            onMouseOver={hoverTrashIcoon}
            onMouseLeave={initialTrashIcoon}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
