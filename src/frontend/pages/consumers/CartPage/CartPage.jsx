"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import styles from "./CartPage.module.scss";
import ProductsInCart from "@/frontend/components/consumers/ProductsInCart/ProductsInCart";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";

const CartPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem } = useCart();

  return (
    <main className={styles.main}>
      <ToPreviousPage title="Кошик" />

      <div className={styles.title}>
        <button
          type="button"
          onClick={() => history.back()}
          className={styles.btnBack}
        >
          <Image
            src="/assets/icon/icon-arrow-left.svg"
            width={28}
            height={28}
            alt="arrow icon"
            priority
          />
        </button>
        <p className={styles.titleText}>Кошик</p>
      </div>

      {cart !== null && cart.length > 0 && (
        <>
          <div className={styles.productsWrapper}>
            <ProductsInCart
              cart={cart}
              removeFromCart={removeFromCart}
              updateCartItem={updateCartItem}
            />
          </div>

          <div className={styles.similarProducts}>
            <ProductList
              className={styles.productList}
              title="Вас може зацікавити:"
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
      )}
      {(cart === null || cart.length === 0) && (
        <p className={styles.warning}>Ви ще нічого не додали в кошик!</p>
      )}
    </main>
  );
};
export default CartPage;
