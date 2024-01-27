"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const FirstName = ({ consumerData, setConsumerData, setDataWasChanged }) => {
  const [consumerFirstName] = useState(consumerData.firstName);
  const [isValid, setIsValid] = useState(true);

  const handleChange = e => {
    if (e.target.value === consumerFirstName) {
      setDataWasChanged(prev => ({
        ...prev,
        firstName: false,
      }));
    } else {
      if (/(^[A-ZА-ЯІЇ][a-zа-яії'-]+$)/g.test(e.target.value)) {
        if (!isValid) {
          setIsValid(true);
          e.target.setCustomValidity("");
        }
        setDataWasChanged(prev => ({
          ...prev,
          firstName: true,
        }));
      } else {
        setDataWasChanged(prev => ({
          ...prev,
          firstName: null,
        }));
        setIsValid(false);
        e.target.setCustomValidity("Invalid field.");
      }
    }

    setConsumerData(prev => ({
      ...prev,
      firstName: e.target.value,
    }));
  };

  return (
    <>
      <label
        htmlFor="name"
        className={isValid ? styles.labelValid : styles.labelInvalid}
      >
        Ім&apos;я:
      </label>
      <input
        autoCapitalize="true"
        type="text"
        name="name"
        id="name"
        className={styles.inputText}
        defaultValue={consumerData.firstName}
        onChange={handleChange}
      />
    </>
  );
};

export default FirstName;
