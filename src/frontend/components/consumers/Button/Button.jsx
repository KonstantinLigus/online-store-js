"use client";
import React, { useEffect, useRef } from "react";
import styles from "./Button.module.scss";

const Button = ({
  title,
  icon,
  onClick,
  secondary,
  ternary,
  ternaryDark,
  maxWidth,
  flexDirection,
  disabled,
}) => {
  const button = useRef();
  useEffect(() => {
    button.current.blur();
  }, [onclick]);

  const handleClick = e => {
    if (onClick) onClick(e);
    if (button.current) {
      button.current.blur();
    }
  };

  return (
    <button
      className={
        secondary || ternary || ternaryDark
          ? ternary
            ? styles.buttonTernary
            : ternaryDark
              ? styles.buttonTernaryDark
              : styles.buttonSecondary
          : styles.button
      }
      onClick={handleClick}
      style={{ maxWidth: maxWidth, flexDirection: flexDirection }}
      disabled={disabled}
      ref={button}
    >
      {icon && (
        <div
          style={{
            maskImage: `url(${icon.src})`,
            WebkitMaskImage: `url(${icon.src})`,
          }}
          className={styles.icon}
        ></div>
      )}
      {title}
    </button>
  );
};

export default Button;
