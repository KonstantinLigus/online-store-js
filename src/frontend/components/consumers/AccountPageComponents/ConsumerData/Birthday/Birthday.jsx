"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const Birthday = ({ consumerData, setConsumerData, setDataWasChanged }) => {
  const [consumerBirthday, setConsumerBirthday] = useState(
    consumerData.birthday,
  );

  const handleChange = e => {
    if (e.target.value !== consumerBirthday) {
      setDataWasChanged(prev => ({
        ...prev,
        birthday: true,
      }));
    } else {
      setDataWasChanged(prev => ({
        ...prev,
        birthday: false,
      }));
    }

    setConsumerData(prev => ({
      ...prev,
      birthday: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        Дата народження:
      </label>
      <input
        type="text"
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
