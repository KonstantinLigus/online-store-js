import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./FilterDialog.module.scss";
import PriceRange from "./PriceRange";

const FilterDialog = ({ toggleFilter, sortedProducts, setFiltredProducts }) => {
  const [minProductPrice, setMinProductPrice] = useState(0);
  const [maxProductPrice, setMaxProductPrice] = useState(100);
  const [minUserPrice, setMinUserPrice] = useState(0);
  const [maxUserPrice, setMaxUserPrice] = useState(100);
  const [isAction, setIsAction] = useState(false);

  useEffect(() => {
    let prices = sortedProducts.map(
      i => i.prices[0].actionPrice ?? i.prices[0].price,
    );
    setMinProductPrice(Math.min(...prices));
    setMinUserPrice(Math.min(...prices));
    setMaxProductPrice(Math.max(...prices));
    setMaxUserPrice(Math.max(...prices));
  }, []);

  const toFilter = () => {
    let filtredList = Array.from(sortedProducts);

    if (minUserPrice > minProductPrice) {
      filtredList = filtredList.filter(
        item =>
          (item.prices[0].actionPrice ?? item.prices[0].price) >= minUserPrice,
      );
    }

    if (maxUserPrice < maxProductPrice) {
      filtredList = filtredList.filter(
        item =>
          (item.prices[0].actionPrice ?? item.prices[0].price) <= maxUserPrice,
      );
    }

    if (isAction) {
      filtredList = filtredList.filter(
        item => item.prices[0].actionPrice !== null,
      );
    }

    setFiltredProducts(filtredList);
    toggleFilter();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleName}>Фільтри</p>
        <Image
          className={styles.titleIcon}
          src="/assets/icon/icon-close.svg"
          alt="sort icon"
          width={16}
          height={16}
          priority
          onClick={toggleFilter}
        />
      </div>

      <details className={styles.details}>
        <summary className={styles.summary}>
          <span>Ціна</span>
          <Image
            src="/assets/icon/icon-angle-down.svg"
            alt="heart icon"
            width={16}
            height={16}
            className={styles.angleIcon}
          />
        </summary>
        <PriceRange
          minProductPrice={minProductPrice}
          maxProductPrice={maxProductPrice}
          minUserPrice={minUserPrice}
          setMinUserPrice={setMinUserPrice}
          maxUserPrice={maxUserPrice}
          setMaxUserPrice={setMaxUserPrice}
        />
      </details>

      <details className={styles.details}>
        <summary className={styles.summary}>
          <span>Категорії</span>
          <Image
            src="/assets/icon/icon-angle-down.svg"
            alt="heart icon"
            width={16}
            height={16}
            className={styles.angleIcon}
          />
        </summary>
        <p>Категорії</p>
      </details>

      <details className={styles.details}>
        <summary className={styles.summary}>
          <span>Виробник</span>
          <Image
            src="/assets/icon/icon-angle-down.svg"
            alt="heart icon"
            width={16}
            height={16}
            className={styles.angleIcon}
          />
        </summary>
        <p>Виробник</p>
      </details>

      <div className={styles.action}>
        <label htmlFor="action" className={styles.action__label}>
          Акційні товари
        </label>
        <input
          type="checkbox"
          name="action"
          id="action"
          onChange={() => setIsAction(!isAction)}
          className={styles.action__checkbox}
        />
      </div>

      <button type="button" className={styles.button} onClick={toFilter}>
        Показати результати
      </button>
    </div>
  );
};

export default FilterDialog;
