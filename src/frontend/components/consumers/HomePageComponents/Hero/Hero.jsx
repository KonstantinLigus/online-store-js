"use client";
import styles from "./Hero.module.scss";
import React from "react";
import ButtonLink from "../../Button/ButtonLink";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.info}>
        <div className={styles.info__wrapper}>
          <h1 className={styles.info__title}>
            Звільнимо Смак з Натуральними Продуктами!
          </h1>
          <ButtonLink
            title="Переглянути товари"
            href="/categories"
            maxWidth="15rem"
          />
        </div>
      </div>

      <div className={styles.picture}>
        <div className={styles.picture__wrapper}></div>
      </div>
    </section>
  );
};

export default Hero;
