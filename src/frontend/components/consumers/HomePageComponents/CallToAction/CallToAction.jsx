"use client";
import styles from "./CallToAction.module.scss";
import React from "react";
import ButtonLink from "../../Button/ButtonLink";

const TextItem = () => {
  return (
    <div className={styles.runtext__item}>
      <p className={styles.runtext__text}>Виготовлено в Україні</p>
      <div className={styles.runtext__dot}></div>
    </div>
  );
};

const CallToAction = () => {
  return (
    <section className={styles.section}>
      <div className={styles.section__content}>
        <h2 className={styles.section__title}>
          Замовляй фермерське<br></br>— підтримуй своє
        </h2>
        <p className={styles.section__info}>
          Купуй локальні продукти просто зараз i підтримай чесних виробників та
          власне здоров’я
        </p>
        <div className={styles.section__links}>
          <ButtonLink
            title="Перейти до асортименту"
            href="/categories"
            maxWidth="17.5rem"
          />
          <ButtonLink
            title="Дізнатись про нас"
            href="/#about"
            maxWidth="17.5rem"
            ternary={true}
          />
        </div>
        <div className={styles.runtext}>
          <TextItem />
          <TextItem />
          <TextItem />
          <TextItem />
          <TextItem />
          <TextItem />
          <TextItem />
          <TextItem />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
