"use client";
import React from "react";
import styles from "../Order.module.scss";

const Fieldset = ({ number, title, children }) => {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>
        <span>{number}</span> {title}
      </legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
