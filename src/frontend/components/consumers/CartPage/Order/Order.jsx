"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Order.module.scss";
import Form from "@/frontend/components/consumers/CartPage/Order/Form/Form";

const Order = props => {
  const closeOrder = () => {
    props.closeOrder(false);
  };

  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [newCustomer, setNewCustomer] = useState(true);
  const [consumerInfo, setConsumerInfo] = useState({
    phoneNumber: "",
    email: "",
    name: "",
    deliveryType: "Нова Пошта - Відділення",
    city: "Київ",
    office: "Відділення №1",
    payment: "receipt",
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

        <div>
          <button onClick={closeOrder} className={styles.btnClose}>
            &#x2715;
          </button>
        </div>
      </div>

      <div className={styles.formContainer}>
        <Form consumer={consumerInfo} closeOrder={closeOrder}></Form>
        {!userAuthenticated && !newCustomer && (
          <div className={styles.logIn}>
            <button className={styles.logInBtn}>
              Увійти / Зареєструватися
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Order;
