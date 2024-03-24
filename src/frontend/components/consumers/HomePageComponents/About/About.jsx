import React from "react";
import Image from "next/image";
import styles from "./About.module.scss";
import Button from "../../Button/Button";

const About = () => {
  const items = [
    {
      id: 0,
      title: "Натуральність",
      image: "assets/home-page/plant.svg",
    },
    {
      id: 1,
      title: "Смак та якість",
      image: "assets/home-page/sparkle.svg",
    },
    {
      id: 2,
      title: "Підтримка фермера",
      image: "assets/home-page/handshake.svg",
    },
    {
      id: 3,
      title: "Зручність",
      image: "assets/home-page/smile.svg",
    },
  ];
  return (
    <section className={styles.about}>
      <h2 className={styles.title}>Про нас</h2>
      <p className={styles.info}>
        Насолоджуйтеся найсвіжішими та найсмачнішими продуктами від маленьких
        фермерських господарств з нашого сайту. Ми пропонуємо вам:
      </p>
      <div className={styles.items}>
        {items.map(item => (
          <div className={styles.item} key={item.id}>
            <Image
              src={item.image}
              width={80}
              height={80}
              alt={item.title}
              priority
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <Button title={"Дізнатись більше"} className={styles.readMoreBtn} />
    </section>
  );
};

export default About;
