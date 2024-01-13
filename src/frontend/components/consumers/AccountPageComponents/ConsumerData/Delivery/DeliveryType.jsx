"use client";
import React, { useState, useEffect } from "react";
import styles from "../ConsumerData.module.scss";
import RegionAndCity from "./RegionAndCity";

const deliveryTypes = [
  "Нова Пошта - Відділення",
  "Нова Пошта - доставка кур’єром",
  "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
];

const DeliveryType = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const [consumerDeliveryType, setConsumerDeliveryType] = useState(
    consumerData.deliveryType,
  );

  const [typeOfDelivery, setTypeOfDelivery] = useState(null);

  useEffect(() => {
    if (consumerData.deliveryType === deliveryTypes[0]) {
      setTypeOfDelivery("office");
    } else if (consumerData.deliveryType === deliveryTypes[1]) {
      setTypeOfDelivery("courier");
    } else {
      setTypeOfDelivery("pickup");
    }
  }, []);

  const handleDeliveryType = e => {
    switch (e.target.value) {
      case deliveryTypes[0]:
        setTypeOfDelivery("office");
        break;
      case deliveryTypes[1]:
        setTypeOfDelivery("courier");
        break;
      case deliveryTypes[2]:
        setTypeOfDelivery("pickup");
        break;
    }

    if (e.target.value !== consumerDeliveryType) {
      setDataWasChanged(prev => ({
        ...prev,
        deliveryType: true,
      }));
    } else {
      setDataWasChanged(prev => ({
        ...prev,
        deliveryType: false,
      }));
    }

    setConsumerData(prev => ({
      ...prev,
      deliveryType: e.target.value,
      region: "",
      city: "",
      postOffice: "",
      street: "",
      house: "",
      flat: "",
    }));
  };

  return (
    <>
      <label htmlFor="delivery" className={styles.labelSelect}>
        Спосіб доставки:
      </label>
      <select
        id="delivery"
        className={styles.select}
        value={consumerData.deliveryType}
        onChange={handleDeliveryType}
      >
        {deliveryTypes.map(i => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      {(typeOfDelivery === "office" || typeOfDelivery === "courier") && (
        <RegionAndCity
          consumerData={consumerData}
          setConsumerData={setConsumerData}
          setDataWasChanged={setDataWasChanged}
          dataIsValid={dataIsValid}
          setDataIsValid={setDataIsValid}
          typeOfDelivery={typeOfDelivery}
        />
      )}
    </>
  );
};

export default DeliveryType;
