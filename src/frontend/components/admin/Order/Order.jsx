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

const Order = ({ order }) => {
  return (
    <div className={styles.order}>
      <p>
        {order.sendingTime.day} {mounths[order.sendingTime.mounth]}{" "}
        {order.sendingTime.year}, {order.sendingTime.hour}:
        {order.sendingTime.minutes}
      </p>

      <hr className={styles.hr} />

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

      {order.ordered.map((item, index) => (
        <OrderedProduct item={item} key={index} />
      ))}

      <hr className={styles.hr} />

      <p>Загальна вартість: {order.totalPrice} грн</p>
    </div>
  );
};
export default Order;
