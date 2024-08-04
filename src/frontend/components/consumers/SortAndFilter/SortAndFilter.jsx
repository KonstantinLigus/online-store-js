import React, { useState } from "react";
import Image from "next/image";
import styles from "./SortAndFilter.module.scss";
import SortDialog from "./SortDialog";
import FilterDialog from "./FilterDialog";

const SortAndFilter = ({
  sortedProducts,
  setSortedProducts,
  filtredProducts,
  setFiltredProducts,
  setFiltredProductsLength,
  categories,
  producers,
}) => {
  const [filterIsOpen, setFilterIsOPen] = useState(false);
  const [sortIsOpen, setSortIsOPen] = useState(false);

  const toggleFilter = () => {
    setFilterIsOPen(!filterIsOpen);
    sortIsOpen && setSortIsOPen(!sortIsOpen);
  };

  const toggleSort = () => {
    setSortIsOPen(!sortIsOpen);
    filterIsOpen && setFilterIsOPen(!filterIsOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={toggleFilter}>
          <Image
            className={styles.buttonImage}
            src="/assets/icon/icon-filter.svg"
            alt="filter icon"
            width={20}
            height={20}
            priority
          />
          <span className={styles.buttonText}>Фільтри</span>
        </button>

        <button className={styles.button} onClick={toggleSort}>
          <Image
            className={styles.buttonImage}
            src="/assets/icon/icon-sort.svg"
            alt="sort icon"
            width={20}
            height={20}
            priority
          />
        </button>
      </div>

      <div className={styles.dialogs}>
        {filterIsOpen && (
          <div className={styles.dialogs__dialog} onClick={toggleFilter}>
            <div
              className={styles.dialogs__dialog_inner}
              onClick={event => event.stopPropagation()}
            >
              <FilterDialog
                toggleFilter={toggleFilter}
                sortedProducts={sortedProducts}
                setFiltredProducts={setFiltredProducts}
                setFiltredProductsLength={setFiltredProductsLength}
                categories={categories}
                producers={producers}
              />
            </div>
          </div>
        )}

        {sortIsOpen && (
          <div className={styles.dialogs__dialog} onClick={toggleSort}>
            <div
              className={`${styles.dialogs__dialog_inner} ${styles.dialogs__dialog_inner_sort} `}
              onClick={event => event.stopPropagation()}
            >
              <SortDialog
                toggleSort={toggleSort}
                sortedProducts={sortedProducts}
                setSortedProducts={setSortedProducts}
                filtredProducts={filtredProducts}
                setFiltredProducts={setFiltredProducts}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SortAndFilter;
