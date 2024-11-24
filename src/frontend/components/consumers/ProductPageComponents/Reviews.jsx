"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./Reviews.module.scss";
import Button from "@/frontend/components/consumers/Button/Button";
import ReviewRating from "./ReviewRating";
import ConsumerReview from "./ConsumerReview";
import GuestReview from "./GuestReview";

const Reviews = ({ reviews, token, itemId, getComments }) => {
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

          <div className={`${styles.buttonReviewWidth} ${styles.desktop}`}>
            <Button
              title="Залишити відгук"
              onClick={() => setAddReview(!addReview)}
              secondary={true}
              maxWidth="100%"
            />
          </div>

          <button
            className={`${styles.review__buttonMoreReviews} ${styles.mobile}`}
            onClick={() => setAllReviewsVisible(!allReviewsVisible)}
          >
            <span className={styles.review__buttonMoreReviewsText}>
              {allReviewsVisible ? "Менше" : "Переглянути всі"}
            </span>
          </button>
        </div>

        {addReview && (
          <div className={styles.review}>
            {status === "authenticated" || token ? (
              <ConsumerReview itemId={itemId} getComments={getComments} />
            ) : (
              <GuestReview />
            )}
          </div>
        )}

        {reviews && reviews.length > 0 && (
          <>
            <ul className={styles.reviews__reviews}>
              {reviews.map((item, index) => {
                const date = new Date(item.date);
                const month = new Intl.DateTimeFormat("uk", {
                  month: "long",
                  day: "numeric",
                }).format(date);
                const year = date.getFullYear();

                return (
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
                      <p className={styles.review__name}>
                        {item.author.firstName} {item.author.surname}
                      </p>

                      <ReviewRating rating={item.score} />

                      <p className={styles.review__date}>
                        {month} {year}
                      </p>
                    </div>

                    <p className={styles.review__message}>{item.comment}</p>
                  </li>
                );
              })}
            </ul>

            {reviews.length > 2 && (
              <>
                <div
                  className={`${styles.mobile} ${styles.center} ${styles.reviews_marginTop}`}
                >
                  <Button
                    title="Залишити відгук"
                    onClick={() => setAddReview(!addReview)}
                    secondary
                  />
                </div>
                <button
                  className={`${styles.review__buttonMoreReviews} ${styles.review__buttonMoreReviews_marginTop} ${styles.desktop} ${styles.review__buttonMoreReviews_alignRight}`}
                  onClick={() => setAllReviewsVisible(!allReviewsVisible)}
                >
                  <span className={styles.review__buttonMoreReviewsText}>
                    {allReviewsVisible ? "Менше" : "Переглянути всі"}
                  </span>
                  {/* <Image
                  src="/assets/icon/icon-angle-down.svg"
                  alt="icon"
                  width={16}
                  height={16}
                  className={
                    allReviewsVisible
                      ? styles.review__buttonMoreReviewsIconUp
                      : styles.review__buttonMoreReviewsIcon
                  }
                /> */}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Reviews;
