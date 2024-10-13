import React from "react";
import styles from "./Button.module.scss";

const Button = ({ title, onClick, className, disabled }) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
