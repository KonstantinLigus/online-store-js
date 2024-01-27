import React from "react";
import styles from "./Burger.module.scss";

const Burger = ({ menuIsClicked, onClick }) => {
  return (
    <div className={styles.burgerContainer} onClick={onClick}>
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
    </div>
  );
};

export default Burger;
