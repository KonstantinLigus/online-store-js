"use client";
import React from "react";
import styles from "../OrderForm.module.scss";

const SecondName = ({ consumer, changeData }) => {
  const handleChange = e => {
    changeData(prev => ({
      ...prev,
      secondName: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        По-батькові:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Дмитрович"
        className={styles.inputText}
        value={consumer.secondName}
        onChange={handleChange}
      />
    </>
  );
};

export default SecondName;
