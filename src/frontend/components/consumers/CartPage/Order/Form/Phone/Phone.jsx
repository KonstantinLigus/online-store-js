"use client";
import React from "react";
import styles from "../Form.module.scss";

const Phone = ({ consumer, changeData }) => {
  const handleChange = e => {
    changeData(prev => ({
      ...prev,
      phoneNumber: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="tel" className={styles.labelText}>
        Номер телефону:
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
