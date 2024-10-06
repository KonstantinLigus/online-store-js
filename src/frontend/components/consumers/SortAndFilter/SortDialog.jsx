import React, { useState } from "react";
import Image from "next/image";
import styles from "./SortDialog.module.scss";

const SortDialog = ({
  toggleSort,
  sortedProducts,
  setSortedProducts,
  filtredProducts,
  setFiltredProducts,
  sortingValue,
  setSortingValue,
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

  const toSort = sortParam => {
    let sortedList = Array.from(sortedProducts);
    let filtredList = Array.from(filtredProducts);
    switch (sortParam[2]) {
      case 1:
        sortPopularFirst(sortedList);
        sortPopularFirst(filtredList);
        break;
      case 2:
        sortActionFirst(sortedList);
        sortActionFirst(filtredList);
        break;
      case 3:
        sortAtoZ(sortedList);
        sortAtoZ(filtredList);
        break;
      case 4:
        sortZtoA(sortedList);
        sortZtoA(filtredList);
        break;
      case 5:
        sortCheapFirst(sortedList);
        sortCheapFirst(filtredList);
        break;
      case 6:
        sortExpensiveFirst(sortedList);
        sortExpensiveFirst(filtredList);
        break;
    }
    setSortedProducts(sortedList);
    setFiltredProducts(filtredList);
    setSortingValue(sortParam[0]);
    toggleSort();
  };

  const parameters = [
    ["Спочатку популярні", "popular", 1],
    ["Спочатку акційні", "sale", 2],
    ["Від А до Я", "aToZ", 3],
    ["Від Я до А", "zToA", 4],
    ["Спочатку дешевші", "cheapFirst", 5],
    ["Спочатку дорожчі", "expensiveFirst", 6],
  ];

  return (
    <div className={styles.items}>
      {parameters.map(item => (
        <button
          key={item[1]}
          className={
            item[0] === sortingValue
              ? `${styles.items__button} ${styles.items__buttonCurrent}`
              : styles.items__button
          }
          onClick={() => toSort(item)}
        >
          {item[0]}
        </button>
      ))}
    </div>
  );
};

export default SortDialog;
