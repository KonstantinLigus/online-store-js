"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import styles from "./CartPage.module.scss";
import ProductsInCart from "@/frontend/components/consumers/ProductsInCart/ProductsInCart";

const CartPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem } = useCart();

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <button
          type="button"
          onClick={() => history.back()}
          className={styles.btnBack}
        >
          &#129120;
        </button>
      </div>

      {cart.length > 0 ? (
        <>
          <div className={styles.productsWrapper}>
            <ProductsInCart
              cart={cart}
              removeFromCart={removeFromCart}
              updateCartItem={updateCartItem}
            />
          </div>

          <div className={styles.price}>
            <p className={styles.caption}>Всього до сплати:</p>
            <p className={styles.sum}>{totalPrice} грн</p>
          </div>

          <div className={styles.linkToOrder}>
            <Link href="/order">
              <p className={styles.button}>Оформити замовлення</p>
            </Link>
          </div>
        </>
      ) : (
        <h1 className={styles.warning}>Ви ще нічого не додали в кошик!</h1>
      )}
    </main>
  );
};
export default CartPage;
