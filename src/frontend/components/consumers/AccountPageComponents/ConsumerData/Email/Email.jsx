"use client";
import React from "react";
import styles from "../ConsumerData.module.scss";

const Email = ({
  consumerData,
  consumerDataChanges,
  setConsumerDataChanges,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const handleChange = e => {
    if (!/^\S+@\S+\.\S+$/.test(e.target.value)) {
      setDataIsValid(prev => ({
        ...prev,
        email: false,
      }));
    } else {
      if (!dataIsValid.email) {
        setDataIsValid(prev => ({
          ...prev,
          email: true,
        }));
      }
    }

    if (e.target.value !== consumerData.email) {
      setDataWasChanged(prev => ({
        ...prev,
        email: true,
      }));
    } else {
      setDataWasChanged(prev => ({
        ...prev,
        email: false,
      }));
    }

    setConsumerDataChanges(prev => ({
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
          style={
            dataIsValid.email ? { display: "none" } : { display: "initial" }
          }
        >
          Введіть дійсний email
        </span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className={styles.inputText}
        value={consumerDataChanges.email}
        onChange={handleChange}
      />
    </>
  );
};

export default Email;
