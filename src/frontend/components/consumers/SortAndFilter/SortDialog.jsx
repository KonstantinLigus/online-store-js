import React, { useState } from "react";
import Image from "next/image";
import styles from "./SortDialog.module.scss";

const SortDialog = ({
  toggleSort,
  sortedProducts,
  setSortedProducts,
  filtredProducts,
  setFiltredProducts,
}) => {
  const [sortType, setSortType] = useState(1);

  const sortPopularFirst = list => {
    list.sort(function (a, b) {
      if (a.label.includes("популярні") < b.label.includes("популярні")) {
        return 1;
      }
      if (a.label.includes("популярні") > b.label.includes("популярні")) {
        return -1;
      }
      return 0;
    });
  };

  const sortActionFirst = list => {
    list.sort(function (a, b) {
      if (!a.prices[0].actionPrice && b.prices[0].actionPrice) {
        return 1;
      }
      if (a.prices[0].actionPrice && !b.prices[0].actionPrice) {
        return -1;
      }
      return 0;
    });
  };

  const sortByRating = list => {
    alert("За рейтингом");
  };

  const sortAtoZ = list => {
    list.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  };

  const sortZtoA = list => {
    list.sort(function (a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  };

  const sortCheapFirst = list => {
    list.sort(
      (a, b) =>
        (a.prices[0].actionPrice ?? a.prices[0].price) -
        (b.prices[0].actionPrice ?? b.prices[0].price),
    );
  };

  const sortExpensiveFirst = list => {
    list.sort(
      (a, b) =>
        (b.prices[0].actionPrice ?? b.prices[0].price) -
        (a.prices[0].actionPrice ?? a.prices[0].price),
    );
  };

  const toSort = () => {
    let sortedList = Array.from(sortedProducts);
    let filtredList = Array.from(filtredProducts);
    switch (sortType) {
      case 1:
        sortPopularFirst(sortedList);
        sortPopularFirst(filtredList);
        break;
      case 2:
        sortActionFirst(sortedList);
        sortActionFirst(filtredList);
        break;
      case 3:
        sortByRating();
        break;
      case 4:
        sortAtoZ(sortedList);
        sortAtoZ(filtredList);
        break;
      case 5:
        sortZtoA(sortedList);
        sortZtoA(filtredList);
        break;
      case 6:
        sortCheapFirst(sortedList);
        sortCheapFirst(filtredList);
        break;
      case 7:
        sortExpensiveFirst(sortedList);
        sortExpensiveFirst(filtredList);
        break;
    }
    setSortedProducts(sortedList);
    setFiltredProducts(filtredList);
    toggleSort();
  };

  const parameters = [
    ["Спочатку популярні", "popular", 1],
    ["Спочатку акційні", "sale", 2],
    ["За рейтингом", "rating", 3],
    ["Від А до Я", "aToZ", 4],
    ["Від Я до А", "zToA", 5],
    ["Спочатку дешевші", "cheapFirst", 6],
    ["Спочатку дорожчі", "expensiveFirst", 7],
  ];

  return (
    <>
      <div className={styles.title}>
        <p className={styles.title__name}>Сортування</p>
        <Image
          className={styles.title__icon}
          src="/assets/icon/icon-close.svg"
          alt="sort icon"
          width={16}
          height={16}
          priority
          onClick={toggleSort}
        />
      </div>

      <ul className={styles.items}>
        {parameters.map(item => (
          <li className={styles.items__item} key={item[1]}>
            <label htmlFor={item[1]} className={styles.items__label}>
              {item[0]}
            </label>
            <input
              type="radio"
              name="sort"
              id={item[1]}
              value={item[2]}
              onChange={() => setSortType(item[2])}
            />
          </li>
        ))}
      </ul>

      <div className={styles.button}>
        <button
          type="button"
          className={styles.button__button}
          onClick={toSort}
        >
          Застосувати
        </button>
      </div>
    </>
  );
};

export default SortDialog;
