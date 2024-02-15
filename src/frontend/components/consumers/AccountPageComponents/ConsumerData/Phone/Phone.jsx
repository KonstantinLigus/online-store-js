"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Phone = ({ consumerData, setConsumerData, setDataWasChanged }) => {
  const [consumerPhoneNumber, setConsumerPhoneNumber] = useState(
    consumerData.customerPhone,
  );
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = e => {
    let { value } = e.target;

    if (value.length <= 4) value = "+380";

    if (/^\+\d+$/.test(value)) setConsumerPhoneNumber(value);

    if (/^\+380\d{9}$/.test(value)) {
      setConsumerData(prev => ({
        ...prev,
        customerPhone: value,
      }));
    }
  };

  return (
    <>
      <label
        htmlFor="tel"
        className={isValid ? styles.labelValid : styles.labelInvalid}
      >
        Номер телефону:
      </label>
      <input
        type="tel"
        name="tel"
        id="tel"
        pattern="^\+380\d{9}$"
        className={styles.inputText}
        value={consumerPhoneNumber}
        onChange={handleInputChange}
      />
    </>
  );
};

export default Phone;
