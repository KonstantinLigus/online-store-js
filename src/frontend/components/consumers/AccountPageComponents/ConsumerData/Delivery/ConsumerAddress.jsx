"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const ConsumerAddress = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const handleStreet = e => {
    setConsumerData(prev => ({
      ...prev,
      street: e.target.value,
      house: "",
      flat: "",
    }));
  };

  const handleHouse = e => {
    setConsumerData(prev => ({
      ...prev,
      house: e.target.value,
      flat: "",
    }));
  };

  const handleFlat = e => {
    setConsumerData(prev => ({
      ...prev,
      flat: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="street" className={styles.labelText}>
        Вулиця:&nbsp;
        <span
          className={styles.invalidData}
          style={
            dataIsValid.street ? { display: "none" } : { display: "initial" }
          }
        >
          Вкажіть вулицю
        </span>
      </label>
      <input
        type="text"
        name="street"
        id="street"
        className={styles.inputText}
        value={consumerData.street}
        onChange={handleStreet}
      />

      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <div>
          <label htmlFor="house" className={styles.labelText}>
            Будинок:&nbsp;
            <span
              className={styles.invalidData}
              style={
                dataIsValid.house ? { display: "none" } : { display: "initial" }
              }
            >
              Вкажіть № будинку
            </span>
          </label>
          <input
            type="text"
            name="house"
            id="house"
            className={styles.inputText}
            value={consumerData.house}
            onChange={handleHouse}
          />
        </div>

        <div>
          <label htmlFor="flat" className={styles.labelText}>
            Квартира:
          </label>
          <input
            type="text"
            name="flat"
            id="flat"
            className={styles.inputText}
            value={consumerData.flat}
            onChange={handleFlat}
          />
        </div>
      </div>
    </>
  );
};

export default ConsumerAddress;
