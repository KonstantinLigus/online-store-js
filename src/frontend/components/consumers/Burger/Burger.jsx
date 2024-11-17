import React from "react";
import styles from "./Burger.module.scss";

const Burger = ({ menuIsClicked, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      aria-label="Бургер меню"
    >
      <div
        className={
          menuIsClicked ? `${styles.bar1} ${styles.bar1__clicked}` : styles.bar1
        }
      ></div>
      <div
        className={
          menuIsClicked ? `${styles.bar1} ${styles.bar2__clicked}` : styles.bar2
        }
      ></div>
      <div
        className={
          menuIsClicked ? `${styles.bar1} ${styles.bar3__clicked}` : styles.bar3
        }
      ></div>
      <div
        className={
          menuIsClicked ? `${styles.bar1} ${styles.bar4__clicked}` : styles.bar4
        }
      ></div>
    </button>
  );
};

export default Burger;
