import React, { useState } from "react";
import styles from "./PriceRange.module.scss";

const PriceRange = ({
  minProductPrice,
  maxProductPrice,
  minUserPrice,
  setMinUserPrice,
  maxUserPrice,
  setMaxUserPrice,
  minInputPrice,
  setMinInputPrice,
  maxInputPrice,
  setMaxInputPrice,
}) => {
  const inputMinPrice = value => {
    value = +value;
    maxUserPrice = +maxUserPrice;
    setMinInputPrice(value.toString());
    if (value >= minProductPrice && value <= maxUserPrice) {
      setMinUserPrice(value);
    }
  };

  const inputMaxPrice = value => {
    console.log(value);
    value = +value;
    maxUserPrice = +maxUserPrice;
    setMaxInputPrice(value.toString());
    if (value >= minUserPrice && value <= maxProductPrice)
      setMaxUserPrice(value);
  };

  const rangeMinPrice = value => {
    setMinInputPrice(value);
    setMinUserPrice(value);
  };

  const rangeMaxPrice = value => {
    setMaxInputPrice(value);
    setMaxUserPrice(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.control}>
        <input
          type="number"
          id="fromInput"
          min={0}
          max={maxUserPrice}
          value={minInputPrice}
          onChange={e => {
            inputMinPrice(e.target.value);
          }}
          className={styles.control__number}
        />
        <input
          type="number"
          id="toInput"
          min={0}
          max={maxProductPrice}
          value={maxInputPrice}
          onChange={e => {
            inputMaxPrice(e.target.value);
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
            rangeMinPrice(e.target.value);
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
            rangeMaxPrice(e.target.value);
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
