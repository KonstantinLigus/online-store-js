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
  dataWasChanged,
  setDataWasChanged,
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
  }, [consumerData.deliveryType]);

  const handleDeliveryType = e => {
    switch (e.target.value) {
      case deliveryTypes[0]:
        setTypeOfDelivery("office");
        setDataWasChanged(prev => ({
          ...prev,
          region: null,
          city: null,
          postOffice: null,
          street: false,
          house: false,
          flat: false,
        }));
        break;
      case deliveryTypes[1]:
        setTypeOfDelivery("courier");
        setDataWasChanged(prev => ({
          ...prev,
          region: null,
          city: null,
          postOffice: false,
          street: null,
          house: null,
          flat: false,
        }));
        break;
      case deliveryTypes[2]:
        setTypeOfDelivery("pickup");
        setDataWasChanged(prev => ({
          ...prev,
          region: false,
          city: false,
          postOffice: false,
          street: false,
          house: false,
          flat: false,
        }));

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
      <label htmlFor="delivery" className={styles.labelValid}>
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
          dataWasChanged={dataWasChanged}
          setDataWasChanged={setDataWasChanged}
          typeOfDelivery={typeOfDelivery}
        />
      )}
    </>
  );
};

export default DeliveryType;
