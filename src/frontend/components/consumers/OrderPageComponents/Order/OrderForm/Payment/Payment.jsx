"use client";
import React, { useState } from "react";
import styles from "../OrderForm.module.scss";
import { Payment as LiqPay } from "@/frontend/components/consumers/Payment/Payment";

const Payment = ({ consumer, changeData }) => {
  const [cardPayment, setCardPayment] = useState(false);

  const handleChange = e => {
    e.target.value === "card" ? setCardPayment(true) : setCardPayment(false);

    changeData(prev => ({
      ...prev,
      paymentMethod: e.target.value,
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
        checked={consumer.paymentMethod === "receipt"}
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
        checked={consumer.paymentMethod === "card"}
        onChange={handleChange}
      />
      <label htmlFor="card" className={styles.labelRadioBtn}>
        Оплата карткою
      </label>

      {/*
      {cardPayment && <LiqPay />}
       */}
    </>
  );
};

export default Payment;
