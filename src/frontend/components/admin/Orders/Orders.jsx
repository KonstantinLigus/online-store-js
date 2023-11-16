"use client";
import "@/global-styles/globals.css";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./Orders.module.scss";
import Order from "../Order/Order";

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      phoneNumber: "+380 50 111 22 22",
      email: "mail@mail.com",
      firstName: "Іван",
      secondName: "",
      surname: "Доу",
      region: "Київська",
      city: "Київ",
      deliveryType: "Нова Пошта - Відділення",
      office: "Відділення №1: вул. Пирогівський шлях, 135",
      payment: "receipt",
      comment: "Зателефонуйте коли відправите",
      ordered: [
        {
          _id: "652019e5e7519ff5c13f298b",
          title: "крупа гречана",
          mainImage:
            "https://store-items-photos.s3.eu-north-1.amazonaws.com/krupa-grechnevaya.webp",
          measure: 2,
          prices: [
            {
              _id: "654e7e59025760f02b52e9d7",
              actionPrice: 475,
              price: 100,
              unit: "г",
              value: 500,
            },
            {
              _id: "654e7e59025760f02b52e9d8",
              actionPrice: 665,
              price: 140,
              unit: "г",
              value: 700,
            },
            {
              _id: "654e7e59025760f02b52e9d9",
              actionPrice: 950,
              price: 200,
              unit: "г",
              value: 1000,
            },
          ],
          quantity: 1,
        },
      ],
    },
    {
      phoneNumber: "+380 97 123 00 00",
      email: "e-mail@mail.com",
      firstName: "Сергій",
      secondName: "Іванович",
      surname: "Іванчук",
      region: "",
      city: "",
      deliveryType: "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
      office: "",
      payment: "card",
      comment: "",
    },
  ]);

  return (
    <div className={styles.orders}>
      <h2>Замовлення:</h2>
      {orders.map((order, index) => (
        <Order order={order} key={index} />
      ))}
    </div>
  );
};
export default Orders;
