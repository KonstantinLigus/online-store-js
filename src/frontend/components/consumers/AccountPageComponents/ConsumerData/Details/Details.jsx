"use client";
import React from "react";
import styles from "../ConsumerData.module.scss";

const Details = ({ title, children }) => {
  return (
    <details className={styles.details} open>
      <summary className={styles.summary}>{title}</summary>
      {children}
    </details>
  );
};

export default Details;
