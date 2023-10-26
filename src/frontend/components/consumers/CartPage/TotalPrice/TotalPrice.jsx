"use client";
import React from "react";
import styles from "./TotalPrice.module.scss";

const TotalPrice = props => {
  return (
    <div className={styles.headline}>
      <p className={styles.caption}>Всього до сплати:</p>
      <p className={styles.sum}>{props.price}$</p>
    </div>
  );
};

export default TotalPrice;
