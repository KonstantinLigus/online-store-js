"use client";
import React from "react";
import { useLike } from "@/hooks/useLike";

import IconButton from "../IconLinkButton/IconButton";

const LikeIcon = ({ productId }) => {
  const { liked, toLike, toDislike } = useLike();

  const likeChecker = id => {
    return liked === null ? false : liked.some(i => i === id);
  };

  return (
    <>
      <IconButton
        icon={likeChecker(productId) ? "heartFilled" : "heart"}
        onClick={
          likeChecker(productId)
            ? () => toDislike(productId)
            : () => toLike(productId)
        }
        ariaLabel={
          likeChecker(productId)
            ? "Видалити з вподобаних"
            : "Додати до вподобаних"
        }
        ternary={true}
      />
    </>
  );
};

export default LikeIcon;
