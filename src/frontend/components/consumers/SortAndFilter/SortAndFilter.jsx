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
          <div className={styles.filter}>
            <FilterDialog
              toggleFilter={toggleFilter}
              sortedProducts={sortedProducts}
              setFiltredProducts={setFiltredProducts}
            />
          </div>
        )}

        {sortIsOpen && (
          <div className={styles.sort}>
            <SortDialog
              toggleSort={toggleSort}
              sortedProducts={sortedProducts}
              setSortedProducts={setSortedProducts}
              filtredProducts={filtredProducts}
              setFiltredProducts={setFiltredProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SortAndFilter;
