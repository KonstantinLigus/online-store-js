"use client";
import React, { useEffect, useState } from "react";
import styles from "./Slider.module.scss";
import Image from "next/image";

const Slider = ({ images }) => {
  const [slide, setSlide] = useState(0);

  function prevSlide() {
    slide === 0 ? setSlide(images.length - 1) : setSlide(prev => prev - 1);
  }

  function nextSLide() {
    slide === images.length - 1 ? setSlide(0) : setSlide(prev => prev + 1);
  }
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={images[slide]}
        height={600}
        width={600}
        alt="product image"
        priority
      />

      <div className={styles.slideNumber}>
        <p>
          {slide + 1} / {images.length}
        </p>
      </div>

      <div className={`${styles.btn} ${styles.btnPrev}`} onClick={prevSlide}>
        <Image
          src="/assets/icon/icon-angle-left.svg"
          width={32}
          height={32}
          alt="angle icon"
          priority
        />
      </div>

      <div className={`${styles.btn} ${styles.btnNext}`} onClick={nextSLide}>
        <Image
          src="/assets/icon/icon-angle-right.svg"
          width={32}
          height={32}
          alt="angle icon"
          priority
        />
      </div>
    </div>
  );
};
export default Slider;
