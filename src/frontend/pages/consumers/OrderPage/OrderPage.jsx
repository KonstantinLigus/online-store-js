"use client";
import "@/global-styles/globals.css";
import React, { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import styles from "./OrderPage.module.scss";
import Header from "@/frontend/components/consumers/OrderPage/Header/Header";
import Order from "@/frontend/components/consumers/OrderPage/Order/Order";
import ProductsInCart from "@/frontend/components/consumers/ProductsInCart/ProductsInCart";

const OrderPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem } = useCart();
  const [showProductsInCart, setShowProductsInCart] = useState(false);

  let orderedProducts = cart.map(i => i.title);
  // useEffect(() => {
  //   orderedProducts = cart.map(i => i.title);
  // }, [cart]);

  const toggleProducts = () => setShowProductsInCart(!showProductsInCart);

  return (
    <main className={styles.main}>
      {cart.length > 0 ? (
        <>
          <Header toggleSign={showProductsInCart} toggle={toggleProducts} />

          <div
            style={
              showProductsInCart ? { display: "block" } : { display: "none" }
            }
          >
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

          <Order productsInCart={orderedProducts} />
        </>
      ) : (
        <h1 className={styles.warning}>Ви ще нічого не додали в кошик!</h1>
      )}
    </main>
  );
};

export default OrderPage;
