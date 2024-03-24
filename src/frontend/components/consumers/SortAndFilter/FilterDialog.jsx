import React, { useState } from "react";
import Image from "next/image";
import styles from "./FilterDialog.module.scss";

const FilterDialog = ({ data, setData, toggleFilter }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleName}>Фільтри</p>
        <Image
          className={styles.titleIcon}
          src="/assets/icon/icon-close.svg"
          alt="sort icon"
          width={16}
          height={16}
          priority
          onClick={toggleFilter}
        />
      </div>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <span>Ціна</span>
          <Image
            src="/assets/icon/icon-angle-down.svg"
            alt="heart icon"
            width={16}
            height={16}
            className={styles.angleIcon}
          />
        </summary>
        <p>Ціна</p>
      </details>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <span>Категорії</span>
          <Image
            src="/assets/icon/icon-angle-down.svg"
            alt="heart icon"
            width={16}
            height={16}
            className={styles.angleIcon}
          />
        </summary>
        <p>Категорії</p>
      </details>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <span>Виробник</span>
          <Image
            src="/assets/icon/icon-angle-down.svg"
            alt="heart icon"
            width={16}
            height={16}
            className={styles.angleIcon}
          />
        </summary>
        <p>Виробник</p>
      </details>
      <details className={styles.details}>
        <summary className={styles.summary}>
          <span>Акційнітовари</span>
          <Image
            src="/assets/icon/icon-angle-down.svg"
            alt="heart icon"
            width={16}
            height={16}
            className={styles.angleIcon}
          />
        </summary>
        <p>Акційнітовари</p>
      </details>
    </div>
  );
};

export default FilterDialog;
