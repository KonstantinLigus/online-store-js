"use client";
import React from "react";
import styles from "../OrderForm.module.scss";

const Phone = ({ consumer, changeData, phoneIsValid, setPhoneIsValid }) => {
  const handleChange = e => {
    if (!phoneIsValid) setPhoneIsValid(true);
    changeData(prev => ({
      ...prev,
      phoneNumber: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="tel" className={styles.labelText}>
        Номер телефону:&nbsp;
        <span
          className={styles.invalidData}
          style={phoneIsValid ? { display: "none" } : { display: "initial" }}
        >
          Номер телефону повинен починатись з +380
        </span>
      </label>
      <input
        type="tel"
        name="tel"
        id="tel"
        placeholder="+380 68 000 00 00"
        className={styles.inputText}
        value={consumer.phoneNumber}
        onChange={handleChange}
      />
    </>
  );
};

export default Phone;
