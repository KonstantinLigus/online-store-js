import React from "react";
import Image from "next/image";
import styles from "./About.module.scss";
import Button from "../../Button/Button";

const About = () => {
  const items = [
    {
      id: 0,
      title: "Натуральність",
      image: "/assets/home-page/naturalness.png",
    },
    {
      id: 1,
      title: "Смак та якість",
      image: "/assets/home-page/quality.png",
    },
    {
      id: 2,
      title: "Підтримка фермера",
      image: "/assets/home-page/handshake.png",
    },
    {
      id: 3,
      title: "Зручність",
      image: "/assets/home-page/convenience.png",
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
          <div className={styles.item} key={item.id}>
            <Image
              src={item.image}
              width={270}
              height={270}
              alt={item.title}
              priority
              className={styles.item__img}
            />
            <p className={styles.item__text}>{item.title}</p>
          </div>
        ))}
      </div>
      <Button title={"Дізнатись більше"} className={styles.about__btn} />
    </section>
  );
};

export default About;
