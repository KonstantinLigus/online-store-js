"use client";
import React from "react";
import Image from "next/image";
import styles from "./Banner.module.scss";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const Banner = () => {
  return (
    <section>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        modules={[Pagination]}
        loop={true}
        className={styles.mySwiper}
      >
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide1}`}>
            <h1 className={styles.slideTitle}>
              Звільнимо Смак з Натуральними Продуктами!
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide2}`}>
            <h1 className={styles.slideTitle}>
              Звільнимо Смак з Натуральними Продуктами!
            </h1>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.slide} ${styles.slide3}`}>
            <h1 className={styles.slideTitle}>
              Звільнимо Смак з Натуральними Продуктами!
            </h1>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
