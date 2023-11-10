"use client";
import React from "react";
import styles from "../OrderForm.module.scss";

const Name = ({ consumer, changeData, nameIsValid, setNameIsValid }) => {
  const handleChange = e => {
    if (!nameIsValid) setNameIsValid(true);
    changeData(prev => ({
      ...prev,
      name: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        ПІБ:&nbsp;
        <span
          className={styles.invalidData}
          style={nameIsValid ? { display: "none" } : { display: "initial" }}
        >
          Введіть правильне ім'я
        </span>
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
