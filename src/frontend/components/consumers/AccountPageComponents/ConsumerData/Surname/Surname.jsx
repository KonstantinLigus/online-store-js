"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Surname = ({ consumerData, setConsumerData, setDataWasChanged }) => {
  const [consumerSurname, setConsumerSurname] = useState(consumerData.surname);
  const [isValid, setIsValid] = useState(true);

  const handleChange = e => {
    if (e.target.value === consumerSurname) {
      setDataWasChanged(prev => ({
        ...prev,
        surname: false,
      }));
    } else {
      if (/(^[A-ZА-ЯІЇ][a-zа-яії'-]+$)/g.test(e.target.value)) {
        if (!isValid) {
          setIsValid(true);
          e.target.setCustomValidity("");
        }
        setDataWasChanged(prev => ({
          ...prev,
          surname: true,
        }));
      } else {
        setDataWasChanged(prev => ({
          ...prev,
          surname: null,
        }));
        setIsValid(false);
        e.target.setCustomValidity("Invalid field.");
      }
    }

    setConsumerData(prev => ({
      ...prev,
      surname: e.target.value,
    }));
  };

  return (
    <>
      <label
        htmlFor="name"
        className={isValid ? styles.labelValid : styles.labelInvalid}
      >
        Прізвище:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className={styles.inputText}
        defaultValue={consumerData.surname}
        onChange={handleChange}
      />
    </>
  );
};

export default Surname;
