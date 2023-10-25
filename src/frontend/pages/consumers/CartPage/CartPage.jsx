"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import styles from "./CartPage.module.scss";
import Header from "@/frontend/components/consumers/CartPage/Header/Header";
import Order from "@/frontend/components/consumers/CartPage/Order/Order";
import ProductsInCart from "@/frontend/components/consumers/CartPage/ProductsInCart/ProductsInCart";
import TotalPrice from "@/frontend/components/consumers/CartPage/TotalPrice/TotalPrice";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [showProductsInCart, setShowProductsInCart] = useState(true);
  const [order, setOrder] = useState(false);

  const toggleProducts = () => setShowProductsInCart(!showProductsInCart);

  return (
    <main className={styles.main}>
      <Header toggleSign={showProductsInCart} toggle={toggleProducts} />

      {cart.length > 0 ? (
        <>
          <div className={styles.productsWrapper}>
            {showProductsInCart && (
              <ProductsInCart cart={cart} removeFromCart={removeFromCart} />
            )}
          </div>
          <div className={styles.price}>
            <TotalPrice price={215} />
            {!order && (
              <button
                className={styles.button}
                onClick={() => {
                  setOrder(true);
                }}
              >
                Оформити замовлення
              </button>
            )}
          </div>
        </>
      ) : (
        <h1 className={styles.warning}>Ви ще нічого не додали в кошик!</h1>
      )}

      {order && <Order closeOrder={setOrder} setOrder={setOrder} />}
    </main>
  );
};
export default CartPage;
