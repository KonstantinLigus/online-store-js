"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";
import RegionAndCity from "./RegionAndCity";

const DeliveryType = ({
  consumerData,
  consumerDataChanges,
  setConsumerDataChanges,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const deliveryTypes = [
    "Нова Пошта - Відділення",
    "Нова Пошта - доставка кур’єром",
    "Самовивіз з магазину в Києві: вул. І.Мазепи, 37",
  ];

  const [typeOfDelivery, setTypeOfDelivery] = useState("office");
  const [regionIsAvailable, setRegionIsAvailable] = useState(true);

  const handleDeliveryType = e => {
    switch (e.target.value) {
      case deliveryTypes[0]:
        setRegionIsAvailable(true);
        setTypeOfDelivery("office");
        break;
      case deliveryTypes[1]:
        setRegionIsAvailable(true);
        setTypeOfDelivery("courier");
        break;
      case deliveryTypes[2]:
        setRegionIsAvailable(false);
        setTypeOfDelivery("pickup");
        break;
    }

    if (e.target.value !== consumerData.deliveryType) {
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

    setConsumerDataChanges(prev => ({
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
        value={consumerDataChanges.deliveryType}
        onChange={handleDeliveryType}
      >
        {deliveryTypes.map(i => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      {/*
      {regionIsAvailable && (
        <RegionAndCity
          consumer={consumer}
          changeData={changeData}
          regionIsValid={regionIsValid}
          setRegionIsValid={setRegionIsValid}
          regionError={regionError}
          setRegionError={setRegionError}
          cityIsValid={cityIsValid}
          setCityIsValid={setCityIsValid}
          cityError={cityError}
          setCityError={setCityError}
          typeOfDelivery={typeOfDelivery}
          setPostOfficeIsValid={setPostOfficeIsValid}
          postOfficeError={postOfficeError}
          setPostOfficeError={setPostOfficeError}
          streetIsValid={streetIsValid}
          setStreetIsValid={setStreetIsValid}
          houseIsValid={houseIsValid}
          setHouseIsValid={setHouseIsValid}
        />
      )}
       */}
    </>
  );
};

export default DeliveryType;
