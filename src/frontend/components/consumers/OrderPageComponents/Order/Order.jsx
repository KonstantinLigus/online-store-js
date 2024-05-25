"use client";
import React  from "react";
import styles from "./Order.module.scss";
import OrderForm from "./OrderForm/OrderForm";
import Link from "next/link";

const Order = props => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <div className={styles.authenticated}>
          {!props.user && (
            <>
              <div className={styles.customerOn}>
                <Link href="/login?callbackUrl=/order">Я постійний клієнт</Link>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={styles.formContainer}>
        <OrderForm {...props} />
      </div>
    </div>
  );
};
export default Order;
