import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./FilterDialog.module.scss";
import PriceRange from "./PriceRange";
import CategoriesFilter from "./CategoriesFilter";
import ProducersFilter from "./ProducersFilter";

const FilterDialog = ({
  toggleFilter,
  sortedProducts,
  setFiltredProducts,
  setFiltredProductsLength,
  categories,
  producers,
}) => {
  const [minProductPrice, setMinProductPrice] = useState(0);
  const [maxProductPrice, setMaxProductPrice] = useState(100);
  const [minUserPrice, setMinUserPrice] = useState(0);
  const [maxUserPrice, setMaxUserPrice] = useState(100);
  const [minInputPrice, setMinInputPrice] = useState(0);
  const [maxInputPrice, setMaxInputPrice] = useState(100);

  const [vegetables, setVegetables] = useState(false);
  const [fruits, setFruits] = useState(false);
  const [nuts, setNuts] = useState(false);
  const [grocery, setGrocery] = useState(false);
  const [conservation, setConservation] = useState(false);
  const [milk, setMilk] = useState(false);

  const [selectedProducers, setSelectedProducers] = useState([]);

  const [isAction, setIsAction] = useState(false);

  useEffect(() => {
    let prices = sortedProducts.map(
      i => i.prices[0].actionPrice ?? i.prices[0].price,
    );
    setMinProductPrice(Math.min(...prices));
    setMinUserPrice(Math.min(...prices));
    setMaxProductPrice(Math.max(...prices));
    setMaxUserPrice(Math.max(...prices));
    setMinInputPrice(Math.min(...prices));
    setMaxInputPrice(Math.max(...prices));
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

    if (vegetables || fruits || nuts || grocery || conservation || milk) {
      let allCategories = [];
      if (vegetables) allCategories.push("овочі");
      if (fruits) allCategories.push("фрукти та ягоди");
      if (nuts) allCategories.push("горіхи");
      if (grocery) allCategories.push("бакалія");
      if (conservation) allCategories.push("консервація");
      if (milk) allCategories.push("молоко");
      filtredList = filtredList.filter(i => allCategories.includes(i.category));
    }

    if (selectedProducers.length > 0) {
      filtredList = filtredList.filter(item =>
        selectedProducers.includes(item.producer),
      );
    }

    if (isAction) {
      filtredList = filtredList.filter(
        item => item.prices[0].actionPrice !== null,
      );
    }

    setFiltredProducts(filtredList);
    setFiltredProductsLength(filtredList.length);
    toggleFilter();
  };

  return (
    <>
      <div className={styles.title}>
        <p className={styles.title__name}>Фільтри</p>
        <Image
          className={styles.title__icon}
          src="/assets/icon/icon-close.svg"
          alt="icon"
          width={16}
          height={16}
          priority
          onClick={toggleFilter}
        />
      </div>

      <div className={styles.items}>
        <details className={styles.items__details}>
          <summary className={styles.items__details__summary}>
            <span className={styles.items__details__summary_span}>Ціна</span>
            <Image
              src="/assets/icon/icon-angle-down.svg"
              alt="icon"
              width={16}
              height={16}
              className={styles.items__details__angleIcon}
            />
          </summary>
          <PriceRange
            minProductPrice={minProductPrice}
            maxProductPrice={maxProductPrice}
            minUserPrice={minUserPrice}
            setMinUserPrice={setMinUserPrice}
            maxUserPrice={maxUserPrice}
            setMaxUserPrice={setMaxUserPrice}
            minInputPrice={minInputPrice}
            setMinInputPrice={setMinInputPrice}
            maxInputPrice={maxInputPrice}
            setMaxInputPrice={setMaxInputPrice}
          />
        </details>

        {categories.length > 0 && (
          <details className={styles.items__details}>
            <summary className={styles.items__details__summary}>
              <span className={styles.items__details__summary_span}>
                Категорії
              </span>
              <Image
                src="/assets/icon/icon-angle-down.svg"
                alt="icon"
                width={16}
                height={16}
                className={styles.items__details__angleIcon}
              />
            </summary>
            <CategoriesFilter
              vegetables={vegetables}
              setVegetables={setVegetables}
              fruits={fruits}
              setFruits={setFruits}
              nuts={nuts}
              setNuts={setNuts}
              grocery={grocery}
              setGrocery={setGrocery}
              conservation={conservation}
              setConservation={setConservation}
              milk={milk}
              setMilk={setMilk}
            />
          </details>
        )}

        <details className={styles.items__details}>
          <summary className={styles.items__details__summary}>
            <span className={styles.items__details__summary_span}>
              Виробник
            </span>
            <Image
              src="/assets/icon/icon-angle-down.svg"
              alt="icon"
              width={16}
              height={16}
              className={styles.items__details__angleIcon}
            />
          </summary>
          <ProducersFilter
            producers={producers}
            selectedProducers={selectedProducers}
            setSelectedProducers={setSelectedProducers}
          />
        </details>

        <div className={styles.checkbox}>
          <label
            htmlFor="action"
            className={`${styles.checkbox__label} ${styles.checkbox__label_color_black}`}
          >
            Акційні товари
          </label>
          <input
            type="checkbox"
            name="action"
            id="action"
            onChange={() => setIsAction(!isAction)}
            className={styles.checkbox__checkbox}
          />
        </div>
      </div>

      <div className={styles.button}>
        <button
          type="button"
          className={styles.button__button}
          onClick={toFilter}
        >
          Показати результати
        </button>
      </div>
    </>
  );
};

export default FilterDialog;
