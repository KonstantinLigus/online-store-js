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
    alert("Спочатку популярні");
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
        sortPopularFirst();
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

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleName}>Сортування</p>
        <Image
          className={styles.titleIcon}
          src="/assets/icon/icon-close.svg"
          alt="sort icon"
          width={16}
          height={16}
          priority
          onClick={toggleSort}
        />
      </div>

      <ul className={styles.sortItems}>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio1">Спочатку популярні</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio1"
            value={"1"}
            onChange={() => setSortType(1)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio2">Спочатку акційні</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio2"
            value={"2"}
            onChange={() => setSortType(2)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio3">За рейтингом</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio3"
            value={"3"}
            onChange={() => setSortType(3)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio4">Від А до Я</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio4"
            value={"4"}
            onChange={() => setSortType(4)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio5">Від Я до А</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio5"
            value={"5"}
            onChange={() => setSortType(5)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio6">Спочатку дешевші</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio6"
            value={"6"}
            onChange={() => setSortType(6)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio7">Спочатку дорожчі</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio7"
            value={"7"}
            onChange={() => setSortType(7)}
          />
        </li>
      </ul>

      <button type="button" className={styles.button} onClick={toSort}>
        Застосувати
      </button>
    </div>
  );
};

export default SortDialog;
