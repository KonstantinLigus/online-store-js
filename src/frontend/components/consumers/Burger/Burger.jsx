import React from "react";
import styles from "./Burger.module.scss";

const Burger = ({ menuIsClicked, onClick }) => {
  return (
    <button className={styles.burgerButton} onClick={onClick}>
      <div
        className={
          menuIsClicked
            ? `${styles.burger} ${styles.clicked}`
            : `${styles.burger} ${styles.unClicked}`
        }
      ></div>
      <div
        className={
          menuIsClicked
            ? `${styles.burger} ${styles.clicked}`
            : `${styles.burger} ${styles.unClicked}`
        }
      ></div>
      <div
        className={
          menuIsClicked
            ? `${styles.burger} ${styles.clicked}`
            : `${styles.burger} ${styles.unClicked}`
        }
      ></div>
    </button>
  );
};

export default Burger;
