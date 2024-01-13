"use client";
import "@/global-styles/globals.css";
import React, { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import styles from "./OrderPage.module.scss";
import Header from "@/frontend/components/consumers/OrderPageComponents/Header/Header";
import Order from "@/frontend/components/consumers/OrderPageComponents/Order/Order";
import ProductsInCart from "@/frontend/components/consumers/ProductsInCart/ProductsInCart";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import Button from "@/frontend/components/consumers/Button/Button";
import { Payment } from "@/frontend/components/consumers/Payment/Payment";

const OrderPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem, removeCart } =
    useCart();
  const [showProductsInCart, setShowProductsInCart] = useState(false);
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [isPaymentShown, setIsPaymentShown] = useState(false);

  let orderedProducts = cart;
  let allProductsPrice = totalPrice;

  const toggleProducts = () => setShowProductsInCart(!showProductsInCart);

  const onToggleBtnClick = () => {
    setIsPaymentShown(!isPaymentShown);
    if (isPaymentShown) setPaymentData(false);
  };

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
            setPaymentData={setPaymentData}
          />
        </>
      )}
      {!cart && (
        <h1 className={styles.warning}>Ви ще нічого не додали в кошик!</h1>
      )}
      {isOrderCreated && (
        <p className={styles.warning}>Ваше замовлення створено</p>
      )}
      {isOrderCreated && paymentData && (
        <Button
          title={isPaymentShown ? "Закрити вікно оплати" : "Оплатити"}
          onClick={onToggleBtnClick}
        />
      )}
      {isPaymentShown && paymentData && (
        <Payment
          dataAndSignatureObj={paymentData}
          setPaymentData={setPaymentData}
        />
      )}
    </main>
  );
};

export default OrderPage;
