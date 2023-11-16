"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Order.module.scss";

const Order = ({ order }) => {
  return (
    <div className={styles.order}>
      <p>Призвище: {order.surname}</p>
      <p>Ім'я: {order.firstName}</p>
      {order.secondName && <p>По-батькові: {order.secondName}</p>}
      <p>Телефон: {order.phoneNumber}</p>
      <p>Email: {order.email}</p>

      <hr className={styles.hr} />

      <p>Доставка: {order.deliveryType}</p>
      {order.region && <p>Область: {order.region}</p>}
      {order.city && <p>Місто: {order.city}</p>}
      {order.office && <p>Адреса: {order.office}</p>}

      <hr className={styles.hr} />

      <p>
        Оплата: {order.payment === "card" ? "Оплачено" : "Оплата при отриманні"}
      </p>

      <hr className={styles.hr} />

      {order.comment && (
        <>
          <p> Коментар: {order.comment}</p>
          <hr className={styles.hr} />
        </>
      )}
    </div>
  );
};
export default Order;
