"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const PostOffice = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const [offices, setOffices] = useState([]);

  const handleOffice = e => {
    setConsumerData(prev => ({
      ...prev,
      postOffice: e.target.value,
      street: "",
      house: "",
      flat: "",
    }));
  };

  const handleKeyDown = e => {
    if (e.key === "Backspace") {
      setConsumerData(prev => ({
        ...prev,
        postOffice: "",
      }));
    }
  };

  return (
    <>
      <label htmlFor="office" className={styles.labelSelect}>
        Відділення:&nbsp;
        <span
          className={styles.invalidData}
          style={
            dataIsValid.postOffice
              ? { display: "none" }
              : { display: "initial" }
          }
        >
          Виберіть відділення з випадаючого списку
        </span>
      </label>
      <input
        list="office"
        name="office"
        className={styles.select}
        value={consumerData.postOffice}
        onChange={handleOffice}
        onKeyDown={handleKeyDown}
      />
      <datalist id="office">
        {offices.map(o => (
          <option key={o.number} value={o.description}>
            {o.description}
          </option>
        ))}
      </datalist>
    </>
  );
};

export default PostOffice;
