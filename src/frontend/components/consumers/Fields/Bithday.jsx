"use client";
import React, { useState } from "react";
import styles from "./Field.module.scss";

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
    <div className={styles.Field__inputWrapper}>
      <label
        htmlFor="birthday"
        className={`${styles.Field__label_marginBottom} ${styles.Field__label}`}
      >
        Дата народження:
      </label>
      <input
        type="date"
        name="birthday"
        id="birthday"
        className={styles.Field__input}
        value={consumerBirthday}
        onChange={handleChange}
      />
    </div>
  );
};

export default Birthday;
