"use client";

import { useState } from "react";
import { Payment } from "../Payment/Payment";

const paymentExample = {
  products: [
    {
      _id: "64f1fd1285a65597f40a4828",
      quantity: 2,
      value: "1 кг",
      price: 50,
    },
    {
      _id: "64f1fe2185a65597f40a482a",
      quantity: 3,
      value: "1 кг",
      price: 60,
    },
  ],
  deliveryInfo: {
    firstName: "Олексій",
    secondName: "Вікторович",
    surname: "Дмитренко",
    region: "Київска",
    city: "Київ",
    deliveryType: "Нова пошта",
    postOffice: 43,
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
    const {
      order: { liqPayEncodedData },
    } = await res.json();
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
