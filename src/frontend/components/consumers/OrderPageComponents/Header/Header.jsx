"use client";
import React from "react";
import styles from "./Header.module.scss";

const Header = props => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Ваше замовлення</h1>
      <button type="button" onClick={props.toggle} className={styles.btnHide}>
        {props.toggleSign ? <>&and;</> : <>&or;</>}
      </button>
    </div>
  );
};

export default Header;

//{props.toggleSign ? "&and;" : "&or;"}
