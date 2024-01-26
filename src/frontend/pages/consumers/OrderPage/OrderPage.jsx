"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import styles from "./OrderPage.module.scss";
import Order from "@/frontend/components/consumers/OrderPageComponents/Order/Order";
import ProductsInCart from "@/frontend/components/consumers/ProductsInCart/ProductsInCart";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import Button from "@/frontend/components/consumers/Button/Button";
import { Payment } from "@/frontend/components/consumers/Payment/Payment";

const OrderPage = () => {
  const { totalPrice, cart, removeFromCart, updateCartItem, removeCart } =
    useCart();
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [isPaymentShown, setIsPaymentShown] = useState(false);

  let orderedProducts = cart;
  let allProductsPrice = totalPrice;

  const onToggleBtnClick = () => {
    setIsPaymentShown(!isPaymentShown);
    if (isPaymentShown) setPaymentData(false);
  };

  return (
    <>
      <ToPreviousPage />
      <div className={styles.order}>
        {cart?.length > 0 && !isOrderCreated && (
          <>
            <details className={styles.details}>
              <summary className={styles.summary}>
                <span>Ваше замовлення</span>
                <Image
                  src="/assets/icon/icon-angle-down.svg"
                  alt="heart icon"
                  width={24}
                  height={24}
                  className={styles.angleIcon}
                />
              </summary>
              <ProductsInCart
                cart={cart}
                removeFromCart={removeFromCart}
                updateCartItem={updateCartItem}
              />
            </details>

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
      </div>
    </>
  );
};

export default OrderPage;
