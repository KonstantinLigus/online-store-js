"use client";
import React, { useEffect, useRef } from "react";
import styles from "./IconLinkButton.module.scss";
import { icons } from "./icons";

const IconButton = ({ icon, ariaLabel, onClick, secondary, ternary }) => {
  const iconButton = useRef();
  useEffect(() => {
    iconButton.current.blur();
  }, [onclick]);

  const handleClick = e => {
    if (onClick) onClick(e);
    if (iconButton.current) {
      iconButton.current.blur();
    }
  };
  return (
    <button
      style={{
        maskImage: `url(${icons[icon].src})`,
        WebkitMaskImage: `url(${icons[icon].src})`,
      }}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={
        secondary || ternary
          ? ternary
            ? styles.buttonTernary
            : styles.buttonSecondary
          : styles.button
      }
      ref={iconButton}
    ></button>
  );
};
export default IconButton;
