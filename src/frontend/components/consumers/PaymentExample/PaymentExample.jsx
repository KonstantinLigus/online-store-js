"use client";

import { useState } from "react";
import { Payment } from "../Payment/Payment";

const paymentExample = {
  products: [
    {
      productName: "яблука",
      value: 2,
      unit: "кг",
      price: 50,
    },
    {
      productName: "помідори",
      value: 3,
      unit: "кг",
      price: 60,
    },
  ],
  deliveryInfo: {
    custumerFullName: "Дмитенко Олексій Вікторович",
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

  const onPayBtnClick = async () => {
    const res = await fetch("api/order/create", {
      method: "POST",
      body: JSON.stringify(paymentExample),
    });
    const {
      order: { liqPayEncodedData },
    } = await res.json();
    setDataAndSignatureObj(liqPayEncodedData);
  };
  return (
    <>
      <button
        onClick={onPayBtnClick}
        style={{ display: "block", border: "2px solid green" }}
      >
        Pay for order
      </button>
      {dataAndSignatureObj && (
        <Payment dataAndSignatureObj={dataAndSignatureObj} />
      )}
    </>
  );
};
