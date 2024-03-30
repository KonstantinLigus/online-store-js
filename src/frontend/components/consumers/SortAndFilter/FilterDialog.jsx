import React, { useState } from "react";
import Image from "next/image";
import styles from "./FilterDialog.module.scss";

const FilterDialog = ({ toggleFilter, sortedProducts, setFiltredProducts }) => {
  const [isAction, setIsAction] = useState(false);

  const toFilter = () => {
    let filtredList = Array.from(sortedProducts);

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
        <p>Ціна</p>
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