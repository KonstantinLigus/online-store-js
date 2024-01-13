"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Phone = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const [consumerPhoneNumber, setConsumerPhoneNumber] = useState(
    consumerData.customerPhone,
  );
  const [phoneNumber, setPhoneNumber] = useState(consumerData.customerPhone);

  const handleClick = e => {
    if (e.target.value.length === 0) setPhoneNumber("+380");
  };

  const handleChange = e => {
    let value = e.target.value;
    let valueLast = value[value.length - 1];

    if (value.length < 17) {
      setDataIsValid(prev => ({
        ...prev,
        customerPhone: false,
      }));
      setDataWasChanged(prev => ({
        ...prev,
        customerPhone: true,
      }));
    } else {
      if (!dataIsValid.customerPhone && /\d/.test(valueLast)) {
        setDataIsValid(prev => ({
          ...prev,
          customerPhone: true,
        }));
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
        setPhoneNumber(value);
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
            setPhoneNumber(value);
            setConsumerData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 9) {
            value = value.slice(0, 8);
            setPhoneNumber(value);
            setConsumerData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 13) {
            value = value.slice(0, 12);
            setPhoneNumber(value);
            setConsumerData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 16) {
            value = value.slice(0, 15);
            setPhoneNumber(value);
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
            setPhoneNumber(value);
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
      <label htmlFor="tel" className={styles.labelText}>
        Номер телефону:&nbsp;
        <span
          className={styles.invalidData}
          style={
            dataIsValid.customerPhone
              ? { display: "none" }
              : { display: "initial" }
          }
        >
          Номер телефону повинен мати 12 цифр
        </span>
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
