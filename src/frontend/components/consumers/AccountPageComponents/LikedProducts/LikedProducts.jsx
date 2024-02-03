"use client";
import React, { useState, useEffect } from "react";
import styles from "./LikedProducts.module.scss";
import { useLike } from "@/hooks/useLike";

const LikedProducts = () => {
  const { liked } = useLike();

  return (
    <>
      {liked && (
        <div>
          <p>Liked Products</p>
        </div>
      )}
    </>
  );
};
export default LikedProducts;
