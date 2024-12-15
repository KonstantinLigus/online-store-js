"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./IconLinkButton.module.scss";
import { icons } from "./icons";

const IconLink = ({ icon, href, ariaLabel, onClick, backgroundColor }) => {
  const iconLink = useRef();
  useEffect(() => {
    iconLink.current.blur();
  }, [onClick]);

  const handleClick = e => {
    if (onClick) onClick(e);
    if (iconLink.current) {
      iconLink.current.blur();
    }
  };
  return (
    <Link
      style={{
        maskImage: `url(${icons[icon].src})`,
        WebkitMaskImage: `url(${icons[icon].src})`,
        backgroundColor: backgroundColor,
      }}
      href={href}
      aria-label={ariaLabel}
      onClick={handleClick}
      prefetch={false}
      className={styles.link}
      ref={iconLink}
    ></Link>
  );
};
export default IconLink;
