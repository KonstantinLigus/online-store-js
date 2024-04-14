import React, { useState } from "react";
import styles from "./CategoriesFilter.module.scss";

const CategoriesFilter = ({
  vegetables,
  setVegetables,
  fruits,
  setFruits,
  nuts,
  setNuts,
  grocery,
  setGrocery,
  conservation,
  setConservation,
  milk,
  setMilk,
}) => {
  return (
    <div className={styles.categories}>
      <div className={styles.categories__category}>
        <label htmlFor="vegetables" className={styles.categories__label}>
          Овочі
        </label>
        <input
          type="checkbox"
          name="vegetables"
          id="vegetables"
          onChange={() => setVegetables(!vegetables)}
          className={styles.categories__checkbox}
        />
      </div>

      <div className={styles.categories__category}>
        <label htmlFor="fruits" className={styles.categories__label}>
          Фрукти та ягоди
        </label>
        <input
          type="checkbox"
          name="fruits"
          id="fruits"
          onChange={() => setFruits(!fruits)}
          className={styles.categories__checkbox}
        />
      </div>

      <div className={styles.categories__category}>
        <label htmlFor="nuts" className={styles.categories__label}>
          Горіхи
        </label>
        <input
          type="checkbox"
          name="nuts"
          id="nuts"
          onChange={() => setNuts(!nuts)}
          className={styles.categories__checkbox}
        />
      </div>

      <div className={styles.categories__category}>
        <label htmlFor="grocery" className={styles.categories__label}>
          Бакалія
        </label>
        <input
          type="checkbox"
          name="grocery"
          id="grocery"
          onChange={() => setGrocery(!grocery)}
          className={styles.categories__checkbox}
        />
      </div>

      <div className={styles.categories__category}>
        <label htmlFor="conservation" className={styles.categories__label}>
          Консервація
        </label>
        <input
          type="checkbox"
          name="conservation"
          id="conservation"
          onChange={() => setConservation(!conservation)}
          className={styles.categories__checkbox}
        />
      </div>

      <div className={styles.categories__category}>
        <label htmlFor="milk" className={styles.categories__label}>
          Молоко
        </label>
        <input
          type="checkbox"
          name=" milk"
          id="milk"
          onChange={() => setMilk(!milk)}
          className={styles.categories__checkbox}
        />
      </div>
    </div>
  );
};

export default CategoriesFilter;
