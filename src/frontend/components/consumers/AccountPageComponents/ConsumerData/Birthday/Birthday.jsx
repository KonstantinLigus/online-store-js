"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Birthday = ({ consumerData, setConsumerData, setDataWasChanged }) => {
  const [consumerBirthday, setConsumerBirthday] = useState(
    consumerData.birthday,
  );

  const handleChange = e => {
    if (e.target.value === consumerBirthday) {
      setDataWasChanged(prev => ({
        ...prev,
        birthday: false,
      }));
    } else {
      setDataWasChanged(prev => ({
        ...prev,
        birthday: true,
      }));
    }

    setConsumerData(prev => ({
      ...prev,
      birthday: e.target.value,
    }));
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
        value={consumerData.birthday}
        onChange={handleChange}
      />
    </>
  );
};

export default Birthday;
