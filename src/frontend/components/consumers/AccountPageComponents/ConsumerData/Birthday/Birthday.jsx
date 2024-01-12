"use client";
import React from "react";
import styles from "../ConsumerData.module.scss";

const Birthday = ({
  consumerData,
  consumerDataChanges,
  setConsumerDataChanges,
  setDataWasChanged,
}) => {
  const handleChange = e => {
    if (e.target.value !== consumerData.birthday) {
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

    setConsumerDataChanges(prev => ({
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
        value={consumerDataChanges.birthday}
        onChange={handleChange}
      />
    </>
  );
};

export default Birthday;
