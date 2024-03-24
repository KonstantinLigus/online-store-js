import React, { useState } from "react";
import Image from "next/image";
import styles from "./SortDialog.module.scss";

const SortDialog = ({ data, setData, toggleSort }) => {
  const toSort = value => {
    let products = Array.from(data);
    switch (value) {
      case 1:
        alert("Спочатку популярні");
        break;
      case 2:
        alert("Спочатку акційні");
        break;
      case 3:
        alert("За рейтингом");
        break;
      case 4:
        products.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        break;
      case 5:
        products.sort(function (a, b) {
          if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return 1;
          }
          if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        break;
      case 6:
        products.sort(
          (a, b) =>
            (a.prices[0].actionPrice ?? a.prices[0].price) -
            (b.prices[0].actionPrice ?? b.prices[0].price),
        );
        break;
      case 7:
        products.sort(
          (a, b) =>
            (b.prices[0].actionPrice ?? b.prices[0].price) -
            (a.prices[0].actionPrice ?? a.prices[0].price),
        );
        break;
    }
    setData(products);
    //setSortIsOPen(!sortIsOpen);
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
            onChange={() => toSort(1)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio2">Спочатку акційні</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio2"
            value={"2"}
            onChange={() => toSort(2)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio3">За рейтингом</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio3"
            value={"3"}
            onChange={() => toSort(3)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio4">Від А до Я</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio4"
            value={"4"}
            onChange={() => toSort(4)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio5">Від Я до А</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio5"
            value={"5"}
            onChange={() => toSort(5)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio6">Спочатку дешевші</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio6"
            value={"6"}
            onChange={() => toSort(6)}
          />
        </li>
        <li className={styles.sortItem}>
          <label htmlFor="sortRadio7">Спочатку дорожчі</label>
          <input
            type="radio"
            name="sort"
            id="sortRadio7"
            value={"7"}
            onChange={() => toSort(7)}
          />
        </li>
      </ul>
    </div>
  );
};

export default SortDialog;
