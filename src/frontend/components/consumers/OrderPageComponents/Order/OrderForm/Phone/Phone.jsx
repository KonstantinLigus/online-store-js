"use client";
import React, { useEffect, useState } from "react";
import styles from "../OrderForm.module.scss";

const Phone = ({ consumer, changeData, phoneIsValid, setPhoneIsValid }) => {
  const [phoneNumber, setPhoneNumber] = useState(consumer.customerPhone);

  useEffect(() => {
    setPhoneNumber(consumer.customerPhone);
  }, [consumer]);

  const handleClick = e => {
    if (e.target.value.length === 0) setPhoneNumber("+380");
  };

  const handleChange = e => {
    if (!phoneIsValid) setPhoneIsValid(true);

    let value = e.target.value;
    let valueLast = value[value.length - 1];

    if (value.length > 3 && value.length < 18) {
      if (/\d/.test(valueLast)) {
        setPhoneNumber(value);
        changeData(prev => ({
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
            changeData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 9) {
            value = value.slice(0, 8);
            setPhoneNumber(value);
            changeData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 13) {
            value = value.slice(0, 12);
            setPhoneNumber(value);
            changeData(prev => ({
              ...prev,
              customerPhone: value,
            }));
          }
          if (value.length === 16) {
            value = value.slice(0, 15);
            setPhoneNumber(value);
            changeData(prev => ({
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
            changeData(prev => ({
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
          style={phoneIsValid ? { display: "none" } : { display: "initial" }}
        >
          Номер телефону повинен мати 12 цифр
        </span>
      </label>
      <input
        type="tel"
        name="tel"
        id="tel"
        placeholder="+380 68 000 00 00"
        className={styles.inputText}
        value={phoneNumber}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
      />
    </>
  );
};

export default Phone;
