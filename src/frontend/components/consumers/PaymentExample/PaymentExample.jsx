"use client";

import { useState } from "react";
import { Payment } from "../Payment/Payment";

const paymentExample = {
  products: [
    {
      productName: "яблука",
      quantity: 2,
      unit: "кг",
      price: 50,
    },
    {
      productName: "помідори",
      quantity: 3,
      unit: "кг",
      price: 60,
    },
  ],
  deliveryInfo: {
    custumerFullName: "Дмитренко Олексій Вікторович",
    city: "Київ",
    deliveryMethod: "Нова пошта",
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
