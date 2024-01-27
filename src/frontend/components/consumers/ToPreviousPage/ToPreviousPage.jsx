import React from "react";
import Image from "next/image";
import styles from "./ToPreviousPage.module.scss";

const ToPreviousPage = ({ title }) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => history.back()}
        className={styles.btnBack}
      >
        <Image
          src="/assets/icon/icon-arrow-left.svg"
          width={28}
          height={28}
          alt="arrow icon"
          priority
        />
      </button>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default ToPreviousPage;
