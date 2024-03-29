"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const SecondName = ({ consumerData, setConsumerData, setDataWasChanged }) => {
  const [consumerSecondName, setConsumerSecondName] = useState(
    consumerData.secondName,
  );

  const handleChange = e => {
    if (e.target.value === consumerSecondName) {
      setDataWasChanged(prev => ({
        ...prev,
        secondName: false,
      }));
    } else {
      setDataWasChanged(prev => ({
        ...prev,
        secondName: true,
      }));
    }

    setConsumerData(prev => ({
      ...prev,
      secondName: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelValid}>
        По-батькові:
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className={styles.inputText}
        defaultValue={consumerData.secondName}
        onChange={handleChange}
      />
    </>
  );
};

export default SecondName;
