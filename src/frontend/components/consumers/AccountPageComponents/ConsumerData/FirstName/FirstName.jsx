"use client";
import React, { useState } from "react";
import styles from "../ConsumerData.module.scss";

const FirstName = ({
  consumerData,
  setConsumerData,
  setDataWasChanged,
  dataIsValid,
  setDataIsValid,
}) => {
  const [consumerFirstName, setConsumerFirstName] = useState(
    consumerData.firstName,
  );

  const handleChange = e => {
    if (!/(^[A-ZА-ЯІЇ][a-zа-яії'-]+$)/g.test(e.target.value)) {
      setDataIsValid(prev => ({
        ...prev,
        firstName: false,
      }));
    } else {
      if (!dataIsValid.firstName) {
        setDataIsValid(prev => ({
          ...prev,
          firstName: true,
        }));
      }
    }

    if (e.target.value !== consumerFirstName) {
      setDataWasChanged(prev => ({
        ...prev,
        firstName: true,
      }));
    } else {
      setDataWasChanged(prev => ({
        ...prev,
        firstName: false,
      }));
    }

    setConsumerData(prev => ({
      ...prev,
      firstName: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="name" className={styles.labelText}>
        Ім&apos;я:&nbsp;
        <span
          className={styles.invalidData}
          style={
            dataIsValid.firstName ? { display: "none" } : { display: "initial" }
          }
        >
          Ім&apos;я має мати не менше 2-х літер
        </span>
      </label>
      <input
        type="text"
        name="name"
        id="name"
        className={styles.inputText}
        value={consumerData.firstName}
        onChange={handleChange}
      />
    </>
  );
};

export default FirstName;
