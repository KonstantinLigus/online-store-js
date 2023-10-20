"use client";
import React from "react";
import styles from "../Order.module.scss";

const ConsumerComment = ({ consumer, changeData }) => {
  const handleChange = e => {
    changeData(prev => ({
      ...prev,
      comment: e.target.value,
    }));
  };

  return (
    <>
      <label htmlFor="comment"></label>
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        placeholder="Додайте коментарі до вашого замовлення"
        className={styles.inputText}
        value={consumer.comment}
        onChange={handleChange}
      ></textarea>
    </>
  );
};

export default ConsumerComment;
