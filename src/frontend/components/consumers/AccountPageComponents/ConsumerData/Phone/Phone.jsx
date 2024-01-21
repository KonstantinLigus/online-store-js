"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Phone = ({ consumerData, setConsumerData, setDataWasChanged }) => {
  const [consumerPhoneNumber, setConsumerPhoneNumber] = useState(
    consumerData.customerPhone,
  );
  const [isValid, setIsValid] = useState(true);

  const handleClick = e => {
    if (e.target.value.length === 0) {
      setConsumerData(prev => ({
        ...prev,
        customerPhone: "+380",
      }));
    }
  };

  const handleChange = e => {
    let value = e.target.value;
    let valueLast = value[value.length - 1];

    if (value.length < 17) {
      setIsValid(false);
      e.target.setCustomValidity("Invalid field.");
      setDataWasChanged(prev => ({
        ...prev,
        customerPhone: null,
      }));
    } else {
      if (/\d/.test(valueLast)) {
        if (!isValid) {
          setIsValid(true);
          e.target.setCustomValidity("");
        }
        if (value === consumerPhoneNumber) {
          setDataWasChanged(prev => ({
            ...prev,
            customerPhone: false,
          }));
        } else {
          setDataWasChanged(prev => ({
            ...prev,
            customerPhone: true,
          }));
        }
      }
    }

    if (value.length > 3 && value.length < 18) {
      if (/\d/.test(valueLast)) {
        setConsumerData(prev => ({
          ...prev,
          customerPhone: value,
        }));
      }
    }
  };

  const handleKeyDown = e => {
    if (/\d/.test(e.key) || e.key === "Backspace") {
      let value = e.target.value;
      if (value.length > 3 && value.length < 18) {
        if (e.key === "Backspace") {
          if (value.length === 6) {
            value = value.slice(0, 4);
            setConsumerData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 9) {
            value = value.slice(0, 8);
            setConsumerData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 13) {
            value = value.slice(0, 12);
            setConsumerData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 16) {
            value = value.slice(0, 15);
            setConsumerData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
        } else {
          if (
            value.length === 4 ||
            value.length === 7 ||
            value.length === 11 ||
            value.length === 14
          ) {
            value += " ";
            setConsumerData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
        }
      }
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
        className={styles.inputText}
        value={consumerData.customerPhone}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      />
    </>
  );
};

export default Phone;
