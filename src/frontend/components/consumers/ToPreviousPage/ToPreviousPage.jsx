import React from "react";
import styles from "./ToPreviousPage.module.scss";

const ToPreviousPage = ({ title }) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => history.back()}
        className={styles.btnBack}
      >
        &#129120;
      </button>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default ToPreviousPage;
