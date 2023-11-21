"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Order.module.scss";
import OrderForm from "./OrderForm/OrderForm";
import RegularCustomer from "./RegularCustomer/RegularCustomer";

const Order = props => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [newCustomer, setNewCustomer] = useState(true);
  const [consumerInfo, setConsumerInfo] = useState({
    customerPhone: "",
    email: "",
    firstName: "",
    secondName: "",
    surname: "",
    region: "",
    city: "",
    deliveryType: "Нова Пошта - Відділення",
    postOffice: "",
    paymentMethod: "receipt",
    comment: "",
  });

  /*  if user is authenticated:
  useEffect(() => {
    if (*** user is authenticated ***) {
    
      *** backend logic ***

      setConsumerInfo(prev => ({
        ...prev,
        *** changing data - user's info from database ***
      }));
      setUserAuthenticated(true);
      setNewCustomer(false);
    }
  }, []) 
  */

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <div className={styles.authenticated}>
          {!userAuthenticated && (
            <>
              <div
                className={newCustomer ? styles.customerOn : styles.customerOff}
              >
                <p onClick={() => setNewCustomer(true)}>Я новий покупець</p>
              </div>
              <div
                className={newCustomer ? styles.customerOff : styles.customerOn}
              >
                <p onClick={() => setNewCustomer(false)}>Я постійний клієнт</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.formContainer}>
        <OrderForm
          consumer={consumerInfo}
          productsInCart={props.productsInCart}
          allProductsPrice={props.allProductsPrice}
        />
        {!userAuthenticated && !newCustomer && <RegularCustomer />}
      </div>
    </div>
  );
};
export default Order;
