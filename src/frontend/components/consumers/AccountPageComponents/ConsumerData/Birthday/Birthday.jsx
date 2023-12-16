"use client";
import React from "react";
import styles from "../ConsumerData.module.scss";

const Birthday = ({ consumer, changeData }) => {
  const handleChange = e => {
    changeData(prev => ({
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
        value={consumer.birthday}
        onChange={handleChange}
      />
    </>
  );
};

export default Birthday;
