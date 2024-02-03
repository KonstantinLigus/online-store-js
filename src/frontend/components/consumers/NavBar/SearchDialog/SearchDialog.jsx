"use client";
import Image from "next/image";
import styles from "./SearchDialog.module.scss";
import React, { useState } from "react";
import FoundProduct from "./FoundProduct";
import { debounce } from "@/frontend/helpers";

export default function SearchDialog({ setIsSearchClicked }) {
  const [filtredProducts, setFiltredProducts] = useState([]);

  const handleInputChange = async e => {
    const productTitle = e.target.value;
    const res = await fetch(`api/items?title=${productTitle}`);
    const { items } = await res.json();
    setFiltredProducts(items);
  };

  const closeSearch = () => {
    setIsSearchClicked(false);
    setFiltredProducts([]);
  };

  return (
    <div className={styles.wrapper} onClick={closeSearch}>
      <div
        className={styles.container}
        onClick={event => event.stopPropagation()}
      >
        <div className={styles.searchBar}>
          <Image
            src="/assets/icon/icon-search.svg"
            width={18}
            height={18}
            alt="search"
            priority
          />
          <input
            type="text"
            className={styles.input}
            onChange={debounce(handleInputChange, 1000)}
          />
          <Image
            src="/assets/icon/icon-close.svg"
            width={18}
            height={18}
            alt="search"
            priority
            className={styles.closeIcon}
            onClick={closeSearch}
          />
        </div>

        {filtredProducts.length > 0 && (
          <div className={styles.itemsContainer}>
            <div className={styles.items}>
              {filtredProducts.map(item => (
                <FoundProduct
                  key={item._id}
                  item={item}
                  closeSearch={closeSearch}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
