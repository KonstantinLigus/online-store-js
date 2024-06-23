"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import styles from "./CartPage.module.scss";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import CartItem from "@/frontend/components/consumers/CartItem/CartItem";

const CartPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem } = useCart();

  return (
    <main className={styles.main}>
      <div className={styles.headline}>
        <button
          type="button"
          onClick={() => history.back()}
          className={styles.headline__button}
        >
          <Image
            src="/assets/icon/icon-arrow-left.svg"
            width={28}
            height={28}
            alt="arrow icon"
            priority
          />
        </button>
        <p className={styles.headline__text}>Кошик</p>
      </div>

      {cart !== null && cart.length > 0 && (
        <>
          <div className={styles.productsWrapper}>
            <ul className={styles.products}>
              {cart.map(item => (
                <CartItem
                  className={styles.cartItem}
                  key={item._id}
                  item={item}
                  removeFromCart={removeFromCart}
                  updateCartItem={updateCartItem}
                />
              ))}
            </ul>
          </div>
        </>
      )}

      {(cart === null || cart.length === 0) && (
        <div className={styles.productsWrapper}>
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
        />
      </div>

      {cart !== null && cart.length > 0 && (
        <>
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
    </main>
  );
};
export default CartPage;
