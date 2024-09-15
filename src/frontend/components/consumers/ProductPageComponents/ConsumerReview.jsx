"use client";
import React, { useState, useRef } from "react";
import styles from "./ConsumerReview.module.scss";
import Button from "@/frontend/components/consumers/Button/Button";
import ConsumeReviewRating from "./ConsumerReviewRating";

const ConsumerReview = ({ reviews, setReviews, setAddReview }) => {
  const [consumerRating, setConsumerRating] = useState(0);
  const messageRef = useRef();

  const sendReview = () => {
    let today = new Date();

    let currentReview = [
      {
        name: "John Doe",
        message: messageRef.current.value,
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
        rating: consumerRating,
      },
    ];

    setReviews(currentReview.concat(reviews));
    setAddReview(false);
  };

  return (
    <div className={styles.consumerReview}>
      <p className={styles.consumerReview__title}>Ваша оцінка:</p>

      <div className={styles.consumerReview__rating}>
        <ConsumeReviewRating
          rating={consumerRating}
          setRating={setConsumerRating}
        />
      </div>

      <label
        htmlFor="productReview"
        className={`${styles.consumerReview__title} ${styles.consumerReview__label}`}
      >
        Ваш відгук:
      </label>

      <textarea
        name="productReview"
        id="productReview"
        className={styles.consumerReview__message}
        rows={5}
        ref={messageRef}
      ></textarea>

      <Button
        className={styles.consumerReview__button}
        title="Залишити відгук"
        onClick={sendReview}
      />
    </div>
  );
};
export default ConsumerReview;
