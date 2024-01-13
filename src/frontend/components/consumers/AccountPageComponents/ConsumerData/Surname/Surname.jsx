"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Surname = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const [consumerSurname, setConsumerSurname] = useState(consumerData.surname);

  const handleChange = e => {
    if (!/(^[A-ZА-ЯІЇ][a-zа-яії'-]+$)/g.test(e.target.value)) {
      setDataIsValid(prev => ({
        ...prev,
        surname: false,
      }));
    } else {
      if (!dataIsValid.firstName) {
        setDataIsValid(prev => ({
          ...prev,
          surname: true,
        }));
      }
    }

    if (e.target.value !== consumerSurname) {
      setDataWasChanged(prev => ({
        ...prev,
        surname: true,
      }));
    } else {
      setDataWasChanged(prev => ({
        ...prev,
        surname: false,
      }));
    }

    setConsumerData(prev => ({
      ...prev,
      surname: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        Прізвище:&nbsp;
        <span
          className={styles.invalidData}
          style={
            dataIsValid.surname ? { display: "none" } : { display: "initial" }
          }
        >
          Прізвище має мати не менше 2-х літер
        </span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className={styles.inputText}
        value={consumerData.surname}
        onChange={handleChange}
      />
    </>
  );
};

export default Surname;
