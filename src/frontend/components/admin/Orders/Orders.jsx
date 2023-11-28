"use client";
import "@/global-styles/globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Orders.module.scss";
import Order from "../Order/Order";

const Orders = () => {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([
    {
      deliveryInfo: {
        firstName: "Іван",
        secondName: "",
        surname: "Доу",
        deliveryType: "Нова Пошта - Відділення",
        region: "Київська",
        city: "Київ",
        postOffice: "Відділення №1: вул. Пирогівський шлях, 135",
        street: "",
        house: "",
        flat: "",
        customerPhone: "+380 50 111 22 22",
        email: "mail@mail.com",
        paymentMethod: "receipt",
        comment: "Зателефонуйте коли відправите",
      },

      products: [
        {
          _id: "652019e5e7519ff5c13f298b",
          quantity: 1,
          value: "1000 г",
          price: 950,
        },
        {
          _id: "652019e5e7519ff5c13f298d",
          quantity: 1,
          value: "1000 г",
          price: 200,
        },
      ],

      sendingTime: {
        day: 12,
        mounth: 8,
        year: 2023,
        hour: 9,
        minutes: 44,
      },
    },
    {
      deliveryInfo: {
        firstName: "Сергій",
        secondName: "Іванович",
        surname: "Іванчук",
        deliveryType: "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
        region: "",
        city: "",
        postOffice: "",
        customerPhone: "+380 97 123 00 00",
        email: "user@mail.com",
        paymentMethod: "card",
        comment: "",
      },

      products: [
        {
          _id: "652019e5e7519ff5c13f298b",
          quantity: 3,
          value: "500 г",
          price: 475,
        },
      ],

      sendingTime: {
        day: 17,
        mounth: 10,
        year: 2023,
        hour: 18,
        minutes: 21,
      },
    },
    {
      deliveryInfo: {
        firstName: "Іван",
        secondName: "",
        surname: "Доу",
        deliveryType: "Нова Пошта - доставка кур’єром",
        region: "Київська",
        city: "Київ",
        postOffice: "",
        street: "Шевченка",
        house: "100",
        flat: "5б",
        customerPhone: "+380 50 111 22 22",
        email: "mail@mail.com",
        paymentMethod: "receipt",
        comment: "Зателефонуйте коли відправите",
      },

      products: [
        {
          _id: "652019e5e7519ff5c13f298d",
          quantity: 3,
          value: "1000 г",
          price: 200,
        },
      ],

      sendingTime: {
        day: 12,
        mounth: 8,
        year: 2023,
        hour: 9,
        minutes: 44,
      },
    },
  ]);

  // backend: remove array from order and get data from database

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/items");
      const { items } = await res.json();
      setData(items);
    };
    fetchData();
  }, []);

  return (
    orders && (
      <div className={styles.orders}>
        <h2>Замовлення:</h2>
        {orders.map((order, index) => (
          <Order
            deliveryInfo={order.deliveryInfo}
            customerProducts={order.products}
            sendingTime={order.sendingTime}
            allProducts={data}
            key={index}
          />
        ))}
      </div>
    )
  );
};
export default Orders;
