"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import styles from "./OrderPageСlient.module.scss";
import Order from "@/frontend/components/consumers/OrderPageComponents/Order/Order";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import Button from "@/frontend/components/consumers/Button/Button";
import { Payment } from "@/frontend/components/consumers/Payment/Payment";
import CartItems from "@/frontend/components/consumers/CartItems";

const OrderPageClient = ({ user }) => {
  const { totalPrice, cart, removeFromCart, updateCartItem, removeCart } =
    useCart();
  const [isOrderCreated, setIsOrderCreated] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [isPaymentShown, setIsPaymentShown] = useState(false);

  const onToggleBtnClick = () => {
    setIsPaymentShown(!isPaymentShown);
    if (isPaymentShown) setPaymentData(false);
  };

  return (
    <>
      {/* <ToPreviousPage title="Оформлення замовлення" /> */}
      <div className={styles.order}>
        {cart?.length > 0 && !isOrderCreated && (
          <>
            <p className={styles.titleText}>Оформлення замовлення</p>

            <div className={styles.orderContainer}>
              <div className={styles.orderDetails}>
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
                  <CartItems
                    cart={cart}
                    removeFromCart={removeFromCart}
                    updateCartItem={updateCartItem}
                    listStyles={styles.cartItems}
                    itemStyles={styles.cartItem}
                  />
                </details>

                <div className={styles.price}>
                  <p className={styles.caption}>Всього до сплати:</p>
                  <p className={styles.sum}>{totalPrice} грн</p>
                </div>
              </div>

              <Order
                user={user}
                cart={cart}
                setIsOrderCreated={setIsOrderCreated}
                removeCart={removeCart}
                setPaymentData={setPaymentData}
              />
            </div>
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

export default OrderPageClient;
