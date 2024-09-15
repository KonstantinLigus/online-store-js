"use client";
import React from "react";
import styles from "./Reviews.module.scss";
import Image from "next/image";

const ReviewRating = ({ rating, setRating }) => {
  return (
    <div className={styles.review__rating}>
      <Image
        className={`${styles.review__star} ${styles.review__star_hover}`}
        src={
          rating >= 1
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        onClick={() => (rating === 1 ? setRating(0) : setRating(1))}
        priority
      />
      <Image
        className={`${styles.review__star} ${styles.review__star_hover}`}
        src={
          rating >= 2
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        onClick={() => setRating(2)}
        priority
      />
      <Image
        className={`${styles.review__star} ${styles.review__star_hover}`}
        src={
          rating >= 3
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        onClick={() => setRating(3)}
        priority
      />
      <Image
        className={`${styles.review__star} ${styles.review__star_hover}`}
        src={
          rating >= 4
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        onClick={() => setRating(4)}
        priority
      />
      <Image
        className={`${styles.review__star} ${styles.review__star_hover}`}
        src={
          rating === 5
            ? "/assets/icon/icon-rating-star-orange.svg"
            : "/assets/icon/icon-rating-star-gray.svg"
        }
        height={18}
        width={18}
        alt="star"
        onClick={() => setRating(5)}
        priority
      />
    </div>
  );
};
export default ReviewRating;
