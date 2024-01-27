"use client";
import React from "react";
import Image from "next/image";
import styles from "../ConsumerData.module.scss";

const Details = ({ title, children }) => {
  return (
    <details className={styles.details} open>
      <summary className={styles.summary}>
        <span>{title}</span>
        <Image
          src="/assets/icon/icon-angle-down.svg"
          alt="heart icon"
          width={24}
          height={24}
          className={styles.angleIcon}
        />
      </summary>
      {children}
    </details>
  );
};

export default Details;
