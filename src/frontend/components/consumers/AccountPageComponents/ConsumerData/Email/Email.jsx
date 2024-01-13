"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Email = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const [consumerEmail, setConsumerEmail] = useState(consumerData.email);

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

    if (e.target.value !== consumerEmail) {
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

    setConsumerData(prev => ({
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
        value={consumerData.email}
        onChange={handleChange}
      />
    </>
  );
};

export default Email;
