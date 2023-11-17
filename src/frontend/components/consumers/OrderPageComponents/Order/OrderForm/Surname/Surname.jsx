"use client";
import React from "react";
import styles from "../OrderForm.module.scss";

const Surname = ({
  consumer,
  changeData,
  surnameIsValid,
  setSurnameIsValid,
}) => {
  const handleChange = e => {
    if (!surnameIsValid) setSurnameIsValid(true);
    changeData(prev => ({
      ...prev,
      surname: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        Прізвище:&nbsp;
        <span
          className={styles.invalidData}
          style={surnameIsValid ? { display: "none" } : { display: "initial" }}
        >
          Введіть правильне прізвище
        </span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Іванчук"
        className={styles.inputText}
        value={consumer.surname}
        onChange={handleChange}
      />
    </>
  );
};

export default Surname;
