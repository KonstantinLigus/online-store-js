"use client";
import React from "react";
import styles from "../ConsumerData.module.scss";

const SecondName = ({
  consumerData,
  consumerDataChanges,
  setConsumerDataChanges,
  setDataWasChanged,
}) => {
  const handleChange = e => {
    if (e.target.value !== consumerData.secondName) {
      setDataWasChanged(prev => ({
        ...prev,
        secondName: true,
      }));
    } else {
      setDataWasChanged(prev => ({
        ...prev,
        secondName: false,
      }));
    }

    setConsumerDataChanges(prev => ({
      ...prev,
      secondName: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        По-батькові:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className={styles.inputText}
        value={consumerDataChanges.secondName}
        onChange={handleChange}
      />
    </>
  );
};

export default SecondName;
