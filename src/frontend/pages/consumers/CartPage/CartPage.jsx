"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import styles from "./CartPage.module.scss";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import CartItem from "@/frontend/components/consumers/CartItem/CartItem";
import PathToPage from "@/frontend/components/consumers/PathToPage/PathToPage";

const CartPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem } = useCart();

  return (
    <>
      <PathToPage pageTitle={"Кошик"} />

      {cart !== null && cart.length > 0 && (
        <div className={styles.container}>
          <ul className={styles.products}>
            {cart.map(item => (
              <CartItem
                key={item._id}
                item={item}
                removeFromCart={removeFromCart}
                updateCartItem={updateCartItem}
              />
            ))}
          </ul>

          <div className={`${styles.price} ${styles.maxWidth}`}>
            <p className={styles.price__text}>Всього до сплати:</p>
            <p className={`${styles.price__text} ${styles.price__text_bold}`}>
              {totalPrice} грн
            </p>
          </div>

          <div className={styles.links}>
            <Link href="/order" className={styles.links__order}>
              Оформити замовлення
            </Link>

            <Link href="/categories" className={styles.links__categories}>
              Повернутись до покупок
            </Link>
          </div>
        </div>
      )}

      {(cart === null || cart.length === 0) && (
        <div className={styles.container}>
          <div className={styles.emptyCart}>
            <div className={styles.emptyCart__icon}></div>
            <p className={styles.emptyCart__text}>
              У вашому кошику немає товарів
            </p>
            <Link href="/categories" className={styles.emptyCart__link}>
              Обрати товар
            </Link>
          </div>
        </div>
      )}

      <div className={styles.similarProducts}>
        <ProductList
          className={styles.productList}
          title="Вас може зацікавити:"
          products="label=популярні"
        />
      </div>
    </>
  );
};
export default CartPage;
