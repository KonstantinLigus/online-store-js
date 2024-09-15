"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./Reviews.module.scss";
import Button from "@/frontend/components/consumers/Button/Button";
import ReviewRating from "./ReviewRating";
import ConsumerReview from "./ConsumerReview";
import GuestReview from "./GuestReview";

const months = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

const Reviews = ({ reviews, setReviews }) => {
  const { status } = useSession();
  const [addReview, setAddReview] = useState(false);
  const [allReviewsVisible, setAllReviewsVisible] = useState(false);

  return (
    <div className={styles.reviews}>
      <div className={styles.reviews__inner}>
        <div className={styles.reviews__header}>
          <div className={styles.reviews__title}>
            <h2 className={styles.reviews__titleReviews}>Відгуки</h2>
            <p className={styles.reviews__titleQty}>
              {reviews ? reviews.length : "0"}
            </p>
          </div>

          <Button
            className={styles.reviews__buttonAddReview}
            title="Залишити відгук"
            onClick={() => setAddReview(!addReview)}
          />
        </div>

        {addReview && (
          <div className={styles.review}>
            {status === "authenticated" ? (
              <ConsumerReview
                reviews={reviews}
                setReviews={setReviews}
                setAddReview={setAddReview}
              />
            ) : (
              <GuestReview />
            )}
          </div>
        )}

        {reviews && reviews.length > 0 && (
          <>
            <ul className={styles.reviews__reviews}>
              {reviews.map((item, index) => (
                <li
                  key={index}
                  className={
                    reviews.length < 3
                      ? styles.review
                      : index < 2
                        ? styles.review
                        : allReviewsVisible
                          ? `${styles.review} ${styles.review_visible}`
                          : `${styles.review} ${styles.review_hidden}`
                  }
                >
                  <div className={styles.review__header}>
                    <p className={styles.review__name}>{item.name}</p>

                    <ReviewRating rating={item.rating} />

                    <p className={styles.review__date}>
                      {item.day} {months[item.month]} {item.year}
                    </p>
                  </div>

                  <p className={styles.review__message}>{item.message}</p>
                </li>
              ))}
            </ul>

            {reviews.length > 2 && (
              <button
                className={styles.review__buttonMoreReviews}
                onClick={() => setAllReviewsVisible(!allReviewsVisible)}
              >
                <span className={styles.review__buttonMoreReviewsText}>
                  {allReviewsVisible ? "Менше" : "Більше"}
                </span>
                <Image
                  src="/assets/icon/icon-angle-down.svg"
                  alt="icon"
                  width={16}
                  height={16}
                  className={
                    allReviewsVisible
                      ? styles.review__buttonMoreReviewsIconUp
                      : styles.review__buttonMoreReviewsIcon
                  }
                />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Reviews;
