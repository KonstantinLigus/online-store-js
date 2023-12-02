"use client";
import React from "react";
import styles from "../OrderForm.module.scss";

const FirstName = ({
  consumer,
  changeData,
  firstNameIsValid,
  setFirstNameIsValid,
}) => {
  const handleChange = e => {
    if (!firstNameIsValid) setFirstNameIsValid(true);
    changeData(prev => ({
      ...prev,
      firstName: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        Ім&apos;я:&nbsp;
        <span
          className={styles.invalidData}
          style={
            firstNameIsValid ? { display: "none" } : { display: "initial" }
          }
        >
          Введіть правильне ім&apos;я
        </span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Сергій"
        className={styles.inputText}
        value={consumer.firstName}
        onChange={handleChange}
      />
    </>
  );
};

export default FirstName;
