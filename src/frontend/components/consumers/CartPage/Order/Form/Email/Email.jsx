"use client";
import React from "react";
import styles from "../Form.module.scss";

const Email = ({ consumer, changeData }) => {
  const handleChange = e => {
    changeData(prev => ({
      ...prev,
      email: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="email" className={styles.labelText}>
        Email:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="name@gmail.com"
        className={styles.inputText}
        value={consumer.email}
        onChange={handleChange}
      />
    </>
  );
};

export default Email;
