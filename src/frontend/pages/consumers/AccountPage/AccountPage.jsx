"use client";
import "@/global-styles/globals.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./AccountPage.module.scss";
import ConsumerData from "@/frontend/components/consumers/AccountPageComponents/ConsumerData/ConsumerData";

const AccountPage = () => {
  const [consumerInfo, setConsumerInfo] = useState({
    firstName: "Сергій",
    secondName: "Іванович",
    surname: "Іванчук",
    customerPhone: "+380 50 111 22 22",
    email: "mail@mail.com",
    birthday: "01.01.2000",
    deliveryType: "Нова Пошта - Відділення",
    region: "Київська",
    city: "Київ",
    postOffice: "Відділення №1: вул. Пирогівський шлях, 135",
    street: "",
    house: "",
    flat: "",
  });

  return (
    <div className={styles.container}>
      <ConsumerData consumer={consumerInfo} />
    </div>
  );
};

export default AccountPage;
