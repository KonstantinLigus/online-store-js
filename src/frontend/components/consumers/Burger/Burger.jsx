import React from "react";
import styles from "./Burger.module.scss";

const Burger = ({ className, onClick }) => {
  return (
    <div className={styles.burgerContainer} onClick={onClick}>
      <div className={`${className}`}></div>
      <div className={`${className}`}></div>
      <div className={`${className}`}></div>
    </div>
  );
};

export default Burger;
