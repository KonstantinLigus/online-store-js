import React from "react";
import styles from "./About.module.scss";
import Button from "../../Button/Button";

const About = () => {
  const items = [
    {
      id: 0,
      value: "100%",
      text: "Свіжість прямо з ферми",
    },
    {
      id: 1,
      value: "5000+",
      text: "Задоволених клієнтів",
    },
    {
      id: 2,
      value: "20",
      text: "Років традицій та якості",
    },
    {
      id: 3,
      value: "50+",
      text: "Видів продукції",
    },
  ];
  return (
    <section className={styles.about}>
      <h2 className={styles.about__title}>Про нас</h2>
      <p className={styles.about__info}>
        Насолоджуйтеся найсвіжішими та найсмачнішими продуктами від маленьких
        фермерських господарств з нашого сайту. Ми пропонуємо вам:
      </p>
      <div className={styles.about__items}>
        {items.map(item => (
          <div className={styles.about__item} key={item.id}>
            <p className={styles.about__value}>{item.value}</p>
            <p className={styles.about__text}>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
