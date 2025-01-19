"use client";
import { useEffect, useState } from "react";

export const useLike = () => {
  const [liked, setLiked] = useState(null);

  useEffect(() => {
    let likedProducts = localStorage.getItem("liked");
    setLiked(() => {
      return likedProducts ? JSON.parse(likedProducts) : [];
    });
  }, []);

  const toLike = item => {
    let likedProducts = localStorage.getItem("liked");
    likedProducts = JSON.parse(likedProducts);
    const updatedLikes = [...likedProducts, item];
    setLiked(updatedLikes);
    localStorage.setItem("liked", JSON.stringify(updatedLikes));
  };

  const toDislike = item => {
    let likedProducts = localStorage.getItem("liked");
    likedProducts = JSON.parse(likedProducts);
    const updatedLikes = likedProducts.filter(i => i !== item);
    setLiked(updatedLikes);
    localStorage.setItem("liked", JSON.stringify(updatedLikes));
  };

  return {
    liked,
    setLiked,
    toLike,
    toDislike,
  };
};
