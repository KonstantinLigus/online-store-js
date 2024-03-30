"use client";
import React, { useState } from "react";
import styles from "./Field.module.scss";

const ConsumerAddress = ({
  consumer,
  changeData,
  streetIsValid,
  setStreetIsValid,
  houseIsValid,
  setHouseIsValid,
}) => {
  const handleStreet = e => {
    if (!streetIsValid) setStreetIsValid(true);
    changeData(prev => ({
      ...prev,
      street: e.target.value,
      house: "",
      flat: "",
    }));
  };

  const handleHouse = e => {
    if (!houseIsValid) setHouseIsValid(true);
    changeData(prev => ({
      ...prev,
      house: e.target.value,
      flat: "",
    }));
  };

  const handleFlat = e => {
    changeData(prev => ({
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
          style={streetIsValid ? { display: "none" } : { display: "initial" }}
        >
          Вкажіть вулицю
        </span>
      </label>
      <input
        type="text"
        name="street"
        id="street"
        className={styles.inputText}
        value={consumer.street}
        onChange={handleStreet}
      />

      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
        <div>
          <label htmlFor="house" className={styles.labelText}>
            Будинок:&nbsp;
            <span
              className={styles.invalidData}
              style={
                houseIsValid ? { display: "none" } : { display: "initial" }
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
            value={consumer.house}
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
            value={consumer.flat}
            onChange={handleFlat}
          />
        </div>
      </div>
    </>
  );
};

export default ConsumerAddress;
