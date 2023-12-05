"use client";
import React from "react";
import styles from "../OrderForm.module.scss";

const Email = ({ consumer, changeData, emailIsValid, setEmailIsValid }) => {
  const handleChange = e => {
    if (!emailIsValid) setEmailIsValid(true);
    changeData(prev => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="email" className={styles.labelText}>
        Email:&nbsp;
        <span
          className={styles.invalidData}
          style={emailIsValid ? { display: "none" } : { display: "initial" }}
        >
          Введіть дійсний email
        </span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="name@gmail.com"
        className={styles.inputText}
        value={consumer.email}
        onChange={handleChange}
      />
    </>
  );
};

export default Email;
