"use client";
import React, { useRef } from "react";
import styles from "./Banner.module.scss";
import Image from "next/image";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const Banner = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  return (
    <section className={styles.banner}>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        slidesPerView={1}
        spaceBetween={0}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        modules={[Navigation, Pagination]}
        loop={true}
        className={styles.mySwiper}
      >
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide1}`}>
            <h1 className={styles.slide__title}>
              Звільнимо Смак з Натуральними Продуктами!
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide2}`}>
            <h1 className={styles.slide__title}>
              Звільнимо Смак з Натуральними Продуктами!
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide3}`}>
            <h1 className={styles.slide__title}>
              Звільнимо Смак з Натуральними Продуктами!
            </h1>
          </div>
        </SwiperSlide>
        <div
          ref={navigationPrevRef}
          className={`${styles.navigationArrow} ${styles.navigationArrow_left}`}
        >
          <Image
            src="/assets/icon/icon-angle-left-white.svg"
            width={10}
            height={16}
            alt="prev"
          />
        </div>
        <div
          ref={navigationNextRef}
          className={`${styles.navigationArrow} ${styles.navigationArrow_right}`}
        >
          <Image
            src="/assets/icon/icon-angle-right-white.svg"
            width={10}
            height={16}
            alt="next"
          />
        </div>
      </Swiper>
    </section>
  );
};

export default Banner;
