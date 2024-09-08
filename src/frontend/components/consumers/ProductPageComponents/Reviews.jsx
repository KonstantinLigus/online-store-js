"use client";
import React, { useState } from "react";
import styles from "./Reviews.module.scss";
import ReviewRating from "./ReviewRating";

const Reviews = ({ reviews }) => {
  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__header}>
        <div className={styles.reviews__title}>
          <h2 className={styles.reviews__titleReviews}>Відгуки</h2>
          <p className={styles.reviews__titleQty}>{reviews.length}</p>
        </div>
      </div>

      <ul className={styles.reviews__reviews}>
        {reviews.map((item, index) => (
          <li key={index} className={styles.review}>
            <div className={styles.review__header}>
              <p className={styles.review__name}>{item.name}</p>

              <ReviewRating rating={item.rating} />

              <p className={styles.review__date}>{item.date}</p>
            </div>

            <p className={styles.review__message}>{item.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Reviews;
