"use client";
import React, { useState, useEffect } from "react";
import styles from "./LikedProducts.module.scss";
import { useLike } from "@/hooks/useLike";

const LikedProducts = props => {
  const { toLike, toDislike } = useLike();

  return (
    <div>
      <p>Liked Products</p>
    </div>
  );
};
export default LikedProducts;
