"use client";
import React from "react";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/frontend/components/consumers/CartItem/CartItem";
import deleteIcon from "public/assets/icon/cart-delete.svg";
import Image from "next/image";
import styles from "./CartPage.module.scss";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <>
      <ul className={styles.cartPage}>
        {cart.length > 0 ? (
          cart.map(item => (
            <CartItem
              className={styles.cartItem}
              key={item._id}
              id={item._id}
              {...item}
            >
              <Image
                key={item._id}
                className={styles.deleteIcon}
                src={deleteIcon}
                alt="delete-icon"
                onClick={() => removeFromCart(item._id)}
                width={20}
              />
            </CartItem>
          ))
        ) : (
          <h1 className={styles.warning}>Ви ще нічого не додали в кошик!</h1>
        )}
      </ul>
      {cart.length > 0 && (
        <div className={styles.cartFooter}>
          <div className={styles.order}>
            <div className={styles.headline}>
              <p className={styles.caption}>Всього до сплати:</p>
              <p className={styles.sum}>215$</p>
            </div>
            <button className={styles.button}>Оформити замовлення</button>
          </div>
        </div>
      )}
    </>
  );
};
export default CartPage;
