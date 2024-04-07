import React, { useState } from "react";
import styles from "./PriceRange.module.scss";

const PriceRange = ({
  minProductPrice,
  maxProductPrice,
  minUserPrice,
  setMinUserPrice,
  maxUserPrice,
  setMaxUserPrice,
}) => {
  const handleMinPrice = value => {
    value = +value;
    maxUserPrice = +maxUserPrice;
    if (value >= minProductPrice && value <= maxUserPrice) {
      setMinUserPrice(value);
    }
  };

  const handleMaxPrice = value => {
    value = +value;
    maxUserPrice = +maxUserPrice;
    if (value >= minUserPrice && value <= maxProductPrice)
      setMaxUserPrice(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.control}>
        <input
          type="number"
          id="fromInput"
          min={minProductPrice}
          max={maxUserPrice}
          value={minUserPrice}
          onChange={e => {
            handleMinPrice(e.target.value);
          }}
          className={styles.control__number}
        />
        <input
          type="number"
          id="toInput"
          min={minUserPrice}
          max={maxProductPrice}
          value={maxUserPrice}
          onChange={e => {
            handleMaxPrice(e.target.value);
          }}
          className={styles.control__number}
        />
      </div>

      <div className={styles.sliders}>
        <input
          id="fromSlider"
          type="range"
          min={minProductPrice}
          max={maxUserPrice}
          value={minUserPrice}
          onChange={e => {
            setMinUserPrice(e.target.value);
          }}
          style={{
            width: `${
              ((maxUserPrice - minProductPrice) /
                (maxProductPrice - minProductPrice)) *
              100
            }%`,
          }}
          className={styles.sliders__range}
        />
        <input
          id="toSlider"
          type="range"
          min={minUserPrice}
          max={maxProductPrice}
          value={maxUserPrice}
          onChange={e => {
            setMaxUserPrice(e.target.value);
          }}
          style={{
            width: `${
              ((maxProductPrice - minUserPrice) /
                (maxProductPrice - minProductPrice)) *
              100
            }%`,
            right: 0,
          }}
          className={styles.sliders__range}
        />
      </div>
    </div>
  );
};

export default PriceRange;
