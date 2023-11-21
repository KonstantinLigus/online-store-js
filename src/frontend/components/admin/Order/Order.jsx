"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Order.module.scss";
import OrderedProduct from "./OrderedProduct";

const mounths = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

const Order = ({
  deliveryInfo,
  customerProducts,
  sendingTime,
  allProducts,
}) => {
  let totalPrice = 0;
  for (let i of customerProducts) {
    totalPrice += i.price * i.quantity;
  }

  return (
    <div className={styles.order}>
      <p>
        {sendingTime.day} {mounths[sendingTime.mounth]} {sendingTime.year},{" "}
        {sendingTime.hour}:{sendingTime.minutes}
      </p>

      <hr className={styles.hr} />
      <p>Призвище: {deliveryInfo.surname}</p>
      <p>Ім&apos;я: {deliveryInfo.firstName}</p>
      {deliveryInfo.secondName && <p>По-батькові: {deliveryInfo.secondName}</p>}
      <p>Телефон: {deliveryInfo.customerPhone}</p>
      <p>Email: {deliveryInfo.email}</p>

      <hr className={styles.hr} />

      <p>Доставка: {deliveryInfo.deliveryType}</p>
      {deliveryInfo.region && <p>Область: {deliveryInfo.region}</p>}
      {deliveryInfo.city && <p>Місто: {deliveryInfo.city}</p>}
      {deliveryInfo.postOffice && <p>Адреса: {deliveryInfo.postOffice}</p>}
      <hr className={styles.hr} />
      <p>
        Оплата:{" "}
        {deliveryInfo.paymentMethod === "card"
          ? "Оплачено"
          : "Оплата при отриманні"}
      </p>

      <hr className={styles.hr} />

      {deliveryInfo.comment && (
        <>
          <p> Коментар: {deliveryInfo.comment}</p>
          <hr className={styles.hr} />
        </>
      )}

      {customerProducts.map((item, index) => (
        <OrderedProduct item={item} allProducts={allProducts} key={index} />
      ))}

      <hr className={styles.hr} />

      <p>Загальна вартість: {totalPrice} грн</p>
    </div>
  );
};
export default Order;
