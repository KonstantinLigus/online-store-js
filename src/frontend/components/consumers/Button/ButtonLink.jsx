"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

const ButtonLink = ({ title, href, onClick, secondary, ternary, maxWidth }) => {
  const button = useRef();
  useEffect(() => {
    button.current.blur();
  }, [onClick]);

  const handleClick = e => {
    if (onClick) onClick(e);
    if (button.current) {
      button.current.blur();
    }
  };

  return (
    <Link
      href={href}
      className={
        secondary || ternary
          ? ternary
            ? styles.linkTernary
            : styles.linkSecondary
          : styles.link
      }
      onClick={handleClick}
      style={{ maxWidth: maxWidth }}
      prefetch={false}
      ref={button}
    >
      {title}
    </Link>
  );
};

export default ButtonLink;
