"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Email = ({ consumerData, setConsumerData, setDataWasChanged }) => {
  const [consumerEmail, setConsumerEmail] = useState(consumerData.email);
  const [isValid, setIsValid] = useState(true);

  const handleChange = e => {
    if (e.target.value === consumerEmail) {
      setDataWasChanged(prev => ({
        ...prev,
        email: false,
      }));
    } else {
      if (/^\S+@\S+\.\S+$/.test(e.target.value)) {
        if (!isValid) {
          setIsValid(true);
          e.target.setCustomValidity("");
        }
        setDataWasChanged(prev => ({
          ...prev,
          email: true,
        }));
      } else {
        setDataWasChanged(prev => ({
          ...prev,
          email: null,
        }));
        setIsValid(false);
        e.target.setCustomValidity("Invalid field.");
      }
    }

    setConsumerData(prev => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <>
      <label
        htmlFor="email"
        className={isValid ? styles.labelValid : styles.labelInvalid}
      >
        Email:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        className={styles.inputText}
        defaultValue={consumerData.email}
        onChange={handleChange}
      />
    </>
  );
};

export default Email;
