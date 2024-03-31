"use client";
import React, { useState } from "react";
import styles from "./Order.module.scss";
import OrderForm from "./OrderForm/OrderForm";
import RegularCustomer from "./RegularCustomer/RegularCustomer";

const Order = props => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [newCustomer, setNewCustomer] = useState(true);

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
        <OrderForm {...props} />
        {!userAuthenticated && !newCustomer && <RegularCustomer />}
      </div>
    </div>
  );
};
export default Order;
