"use client";
import "@/global-styles/globals.css";
import React, { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import styles from "./OrderPage.module.scss";
import Header from "@/frontend/components/consumers/OrderPageComponents/Header/Header";
import Order from "@/frontend/components/consumers/OrderPageComponents/Order/Order";
import ProductsInCart from "@/frontend/components/consumers/ProductsInCart/ProductsInCart";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";

const OrderPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem, removeCart } =
    useCart();
  const [showProductsInCart, setShowProductsInCart] = useState(false);
  const [isOrderCreated, setIsOrderCreated] = useState(false);

  let orderedProducts = cart;
  let allProductsPrice = totalPrice;

  const toggleProducts = () => setShowProductsInCart(!showProductsInCart);

  return (
    <main className={styles.main}>
      <ToPreviousPage />

      {cart?.length > 0 && !isOrderCreated && (
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

          <Order
            productsInCart={orderedProducts}
            allProductsPrice={allProductsPrice}
            setIsOrderCreated={setIsOrderCreated}
            removeCart={removeCart}
          />
        </>
      )}
      {!cart && (
        <h1 className={styles.warning}>Ви ще нічого не додали в кошик!</h1>
      )}
      {isOrderCreated && (
        <p style={{ padding: "40px", textAlign: "center" }}>
          Ваше замовлення створено
        </p>
      )}
    </main>
  );
};

export default OrderPage;
