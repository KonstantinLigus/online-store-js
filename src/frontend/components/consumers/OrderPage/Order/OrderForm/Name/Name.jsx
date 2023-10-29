"use client";
import React from "react";
import styles from "../OrderForm.module.scss";

const Name = ({ consumer, changeData }) => {
  const handleChange = e => {
    changeData(prev => ({
      ...prev,
      name: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        ПІБ:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Іванчук Сергій Дмитрович"
        className={styles.inputText}
        value={consumer.name}
        onChange={handleChange}
      />
    </>
  );
};

export default Name;
