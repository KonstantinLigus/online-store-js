"use client";
import React, { useState } from "react";
import styles from "./Order.module.scss";
import OrderForm from "./OrderForm/OrderForm";
import LoginForm from "../../LoginForm";

const Order = props => {
  const [isCustomerAuthenticated, setIsCustomerAuthenticated] = useState(true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <div className={styles.authenticated}>
          {!props.user && (
            <>
              <div
                className={
                  isCustomerAuthenticated
                    ? styles.customerOn
                    : styles.customerOff
                }
              >
                <p onClick={() => setIsCustomerAuthenticated(true)}>
                  Я новий покупець
                </p>
              </div>
              <div
                className={
                  isCustomerAuthenticated
                    ? styles.customerOff
                    : styles.customerOn
                }
              >
                <p onClick={() => setIsCustomerAuthenticated(false)}>
                  Я постійний клієнт
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.formContainer}>
        {isCustomerAuthenticated && <OrderForm {...props} />}
        {!isCustomerAuthenticated && <LoginForm callbackUrl="/order" />}
      </div>
    </div>
  );
};
export default Order;
