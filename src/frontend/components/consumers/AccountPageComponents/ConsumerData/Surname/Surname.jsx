"use client";
import React from "react";
import styles from "../ConsumerData.module.scss";

const Surname = ({
  consumerData,
  consumerDataChanges,
  setConsumerDataChanges,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
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

    if (e.target.value !== consumerData.surname) {
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

    setConsumerDataChanges(prev => ({
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
        value={consumerDataChanges.surname}
        onChange={handleChange}
      />
    </>
  );
};

export default Surname;