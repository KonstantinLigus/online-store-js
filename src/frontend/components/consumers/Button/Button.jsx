import React from "react";
import styles from "./Button.module.scss";

const Button = ({ title, onClick, className }) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
