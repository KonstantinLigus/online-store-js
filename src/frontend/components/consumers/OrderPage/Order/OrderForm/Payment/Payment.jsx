"use client";
import React from "react";
import styles from "../OrderForm.module.scss";

const Payment = ({ consumer, changeData }) => {
  const handleChange = e => {
    changeData(prev => ({
      ...prev,
      payment: e.target.value,
    }));
  };

  return (
    <>
      <input
        type="radio"
        name="payment"
        id="receipt"
        value="receipt"
        className={styles.radioBtn}
        checked={consumer.payment === "receipt"}
        onChange={handleChange}
      />
      <label htmlFor="receipt" className={styles.labelRadioBtn}>
        Оплата при отриманні
      </label>

      <br />

      <input
        type="radio"
        name="payment"
        id="card"
        value="card"
        className={styles.radioBtn}
        checked={consumer.payment === "card"}
        onChange={handleChange}
      />
      <label htmlFor="card" className={styles.labelRadioBtn}>
        Оплата карткою
      </label>
    </>
  );
};

export default Payment;
