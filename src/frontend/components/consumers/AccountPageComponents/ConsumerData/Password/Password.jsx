"use client";
import React from "react";
import styles from "../ConsumerData.module.scss";

const Password = ({ placeholder }) => {
  return (
    <>
      <input
        type="text"
        name="password"
        id="password"
        placeholder={placeholder}
        className={styles.inputText}
      />
    </>
  );
};

export default Password;
