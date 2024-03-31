"use client";

import { useState } from "react";
import { Payment } from "../Payment/Payment";

const paymentExample = {
  products: [
    {
      productName: "яблуко Чемпіон",
      _id: "652528b3a850903c68a676ab",
      quantity: 2,
      value: "100 г",
      price: 10,
    },
    {
      productName: "морква",
      _id: "652528b3a850903c68a676aa",
      quantity: 3,
      value: "100 г",
      price: 12,
    },
  ],
  deliveryInfo: {
    firstName: "Олексій",
    secondName: "Вікторович",
    surname: "Дмитренко",
    region: { name: "Київська", ref: "dcaadb64-4b33-11e4-ab6d-005056801329" },
    city: { name: "Київ", ref: "e718a680-4b33-11e4-ab6d-005056801329" },
    deliveryType: "Нова Пошта - Відділення",
    postOffice: { name: "Відділення №1: вул. Пирогівський шлях, 135", ref: "" },
    customerPhone: "+380949568123",
    email: "user@gmail.com",
    paymentMethod: "card",
    comment: "hello",
  },
  isCompleted: false,
};

export const PaymentExample = () => {
  const [dataAndSignatureObj, setDataAndSignatureObj] = useState(null);
  const [isShowPayment, setIsShowPayment] = useState(false);

  const createOrderHandler = async () => {
    const res = await fetch("api/order/create", {
      method: "POST",
      body: JSON.stringify(paymentExample),
    });
    const { liqPayEncodedData } = await res.json();

    setDataAndSignatureObj(liqPayEncodedData);
  };
  const payForOrderBtnClickHandler = () => setIsShowPayment(true);
  return (
    <>
      <button
        onClick={createOrderHandler}
        style={{ display: "block", border: "2px solid green" }}
      >
        Create order
      </button>
      {dataAndSignatureObj && (
        <>
          <p>Order was created! Ready to pay!</p>
          <button
            onClick={payForOrderBtnClickHandler}
            style={{ display: "block", border: "2px solid green" }}
          >
            Pay for order
          </button>
        </>
      )}
      {dataAndSignatureObj && isShowPayment && (
        <Payment dataAndSignatureObj={dataAndSignatureObj} />
      )}
    </>
  );
};
