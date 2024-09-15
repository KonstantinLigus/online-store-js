"use client";
import React from "react";
import styles from "./Reviews.module.scss";
import Image from "next/image";

const ReviewRating = ({ rating }) => {
  return (
    <div className={styles.review__rating}>
      <Image
        className={styles.review__star}
        src={
          rating >= 1
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        priority
      />
      <Image
        className={styles.review__star}
        src={
          rating >= 2
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        priority
      />
      <Image
        className={styles.review__star}
        src={
          rating >= 3
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        priority
      />
      <Image
        className={styles.review__star}
        src={
          rating >= 4
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        priority
      />
      <Image
        className={styles.review__star}
        src={
          rating === 5
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        priority
      />
    </div>
  );
};
export default ReviewRating;
