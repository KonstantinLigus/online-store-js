"use client";
import React, { useState } from "react";
import styles from "./GuestReview.module.scss";
import Link from "next/link";

const GuestReview = () => {
  return (
    <div className={styles.guestReview}>
      <p className={styles.guestReview__title}>
        Залишити відгук на сайті можуть лише зареєстровані користувачі.
      </p>
      <div className={styles.guestReview__links}>
        <Link
          href="/login"
          prefetch={false}
          className={styles.guestReview__link}
        >
          Увійти
        </Link>
        <Link
          href="/register"
          prefetch={false}
          className={styles.guestReview__link}
        >
          Зареєструватись
        </Link>
      </div>
    </div>
  );
};
export default GuestReview;
