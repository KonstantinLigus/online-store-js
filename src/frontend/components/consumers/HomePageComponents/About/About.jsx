"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./About.module.scss";

const About = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [freshness, setFreshness] = useState(0);
  const [clients, setClients] = useState(0);
  const [years, setYears] = useState(0);
  const [sorts, setSorts] = useState(0);

  const ulRef = useRef(null);

  const animateCounters = () => {
    let frame = 0;
    const totalFrames = 60;
    const duration = 1000;
    const interval = duration / totalFrames;

    const target = {
      freshness: 100,
      clients: 5000,
      years: 20,
      sorts: 50,
    };

    const counter = setInterval(() => {
      frame++;
      setFreshness(Math.round((target.freshness * frame) / totalFrames));
      setClients(Math.round((target.clients * frame) / totalFrames));
      setYears(Math.round((target.years * frame) / totalFrames));
      setSorts(Math.round((target.sorts * frame) / totalFrames));

      if (frame === totalFrames) clearInterval(counter);
    }, interval);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px 0px -200px 0px",
      },
    );

    if (ulRef.current) {
      observer.observe(ulRef.current);
    }

    return () => {
      if (ulRef.current) {
        observer.unobserve(ulRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section className={styles.about} id="about">
      <h2 className={styles.about__title}>Про нас</h2>

      <p className={styles.about__info}>
        Насолоджуйтеся найсвіжішими та найсмачнішими продуктами від маленьких
        фермерських господарств з нашого сайту. Ми пропонуємо вам:
      </p>

      <ul className={styles.about__items} ref={ulRef}>
        <li className={styles.about__item}>
          <p className={styles.about__value}>{freshness}%</p>
          <p className={styles.about__text}>Свіжість прямо з ферми</p>
        </li>

        <li className={styles.about__item}>
          <p className={styles.about__value}>{clients}+</p>
          <p className={styles.about__text}>Задоволених клієнтів</p>
        </li>

        <li className={styles.about__item}>
          <p className={styles.about__value}>{years}</p>
          <p className={styles.about__text}>Років традицій та якості</p>
        </li>

        <li className={styles.about__item}>
          <p className={styles.about__value}>{sorts}+</p>
          <p className={styles.about__text}>Видів продукції</p>
        </li>
      </ul>
    </section>
  );
};

export default About;

/*"use client";
import React, { useState } from "react";
import styles from "./About.module.scss";

const About = () => {
  const [freshness, useFreshness] = useState(0); //100
  const [clients, setClients] = useState(0); // 5000
  const [years, setYears] = useState(0); //20
  const [sorts, setSorts] = useState(0); //50

  const handleScroll = () => {};

  return (
    <section className={styles.about} id="about">
      <h2 className={styles.about__title}>Про нас</h2>

      <p className={styles.about__info}>
        Насолоджуйтеся найсвіжішими та найсмачнішими продуктами від маленьких
        фермерських господарств з нашого сайту. Ми пропонуємо вам:
      </p>

      <ul className={styles.about__items} onScroll={handleScroll}>
        <li className={styles.about__item}>
          <p className={styles.about__value}>{freshness}%</p>
          <p className={styles.about__text}>Свіжість прямо з ферми</p>
        </li>

        <li className={styles.about__item}>
          <p className={styles.about__value}>{clients}+</p>
          <p className={styles.about__text}>Задоволених клієнтів</p>
        </li>

        <li className={styles.about__item}>
          <p className={styles.about__value}>{years}</p>
          <p className={styles.about__text}>Років традицій та якості</p>
        </li>

        <li className={styles.about__item}>
          <p className={styles.about__value}>{sorts}+</p>
          <p className={styles.about__text}>Видів продукції</p>
        </li>
      </ul>
    </section>
  );
};

export default About;
*/
