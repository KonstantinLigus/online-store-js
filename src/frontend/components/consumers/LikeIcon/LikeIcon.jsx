"use client";
import React, { useEffect, useState } from "react";
import styles from "./LikeIcon.module.scss";
import Image from "next/image";
import { useLike } from "@/hooks/useLike";

const LikeIcon = ({ productId }) => {
  const { liked, toLike, toDislike } = useLike();

  const likeChecker = id => {
    return liked === null ? false : liked.some(i => i === id);
  };

  return (
    <>
      {likeChecker(productId) ? (
        <Image
          src="/assets/icon/icon-heart-fill.svg"
          alt="heart icon"
          width={24}
          height={24}
          className={styles.heartIcon}
          onClick={() => toDislike(productId)}
        />
      ) : (
        <Image
          src="/assets/icon/icon-heart.svg"
          alt="heart icon"
          width={24}
          height={24}
          className={styles.heartIcon}
          onClick={() => toLike(productId)}
        />
      )}
    </>
  );
};

export default LikeIcon;
