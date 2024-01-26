"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import styles from "./CartPage.module.scss";
import ProductsInCart from "@/frontend/components/consumers/ProductsInCart/ProductsInCart";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";

const CartPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem } = useCart();

  return (
    <main className={styles.main}>
      <ToPreviousPage title="Кошик" />

      <h2 className={styles.title}>Кошик</h2>

      {cart !== null && cart.length > 0 && (
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
              {/* <p className={styles.button}>Оформити замовлення</p> */}
              <button className={styles.button} onClick={e => e.preventDefault}>
                Оформити замовлення
              </button>
            </Link>
          </div>
        </>
      )}
      {(cart === null || cart.length === 0) && (
        <p className={styles.warning}>Ви ще нічого не додали в кошик!</p>
      )}
    </main>
  );
};
export default CartPage;
