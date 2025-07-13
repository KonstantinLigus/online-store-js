"use client";
import React, { useState, useRef } from "react";
import styles from "./ConsumerReview.module.scss";
import Button from "@/frontend/components/consumers/Button/Button";
import ConsumeReviewRating from "./ConsumerReviewRating";

const ConsumerReview = ({ itemId, getComments }) => {
  const [consumerRating, setConsumerRating] = useState(0);
  const [message, setMessage] = useState("");

  const onChangeClick = e => {
    setMessage(e.target.value);
  };

  const sendReview = async () => {
    await fetch("api/comments/create", {
      method: "POST",
      body: JSON.stringify({ comment: message, score: consumerRating, itemId }),
    });

    await getComments();
    setMessage("");
    setConsumerRating("");
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
        value={message}
        onChange={onChangeClick}
      ></textarea>

      <Button
        className={styles.consumerReview__button}
        title="Залишити відгук"
        onClick={sendReview}
        disabled={!message}
      />
    </div>
  );
};
export default ConsumerReview;
