"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Birthday = ({ initValue, setState }) => {
  const [consumerBirthday, setConsumerBirthday] = useState(initValue);

  const handleChange = e => {
    const { value } = e.target;

    setConsumerBirthday(value);

    if (/\d{2}\/\d{2}\/\d{2}/.test(value) && value !== initValue) {
      setState(prev => ({
        ...prev,
        birthday: value,
      }));
    }
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelValid}>
        Дата народження:
      </label>
      <input
        type="date"
        name="birthday"
        id="birthday"
        className={styles.inputText}
        value={consumerBirthday}
        onChange={handleChange}
      />
    </>
  );
};

export default Birthday;
