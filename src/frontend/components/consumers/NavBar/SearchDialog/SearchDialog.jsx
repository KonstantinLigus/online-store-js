"use client";
import Image from "next/image";
import styles from "./SearchDialog.module.scss";
import React, { useState } from "react";
import FoundProduct from "./FoundProduct";

export default function SearchDialog({ setIsSearchClicked }) {
  const [products, setProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = e => {
    if (e.target.value.length === 1 && searchValue.length === 2) {
      setProducts([]);
      setFiltredProducts([]);
    } else if (e.target.value.length === 2) {
      if (e.target.value !== searchValue.slice(0, 2)) {
        const fetchData = async () => {
          const res = await fetch("api/items");
          const { items } = await res.json();
          setProducts(
            items.filter(i =>
              i.title.toLowerCase().includes(e.target.value.toLowerCase()),
            ),
          );
          setFiltredProducts(
            items.filter(i =>
              i.title.toLowerCase().includes(e.target.value.toLowerCase()),
            ),
          );
        };
        fetchData();
        //console.log("request to server");
      } else {
        setFiltredProducts(products);
        //console.log("request to 'products'");
      }
    } else if (e.target.value.length > 2) {
      setFiltredProducts(
        products.filter(i =>
          i.title.toLowerCase().includes(e.target.value.toLowerCase()),
        ),
      );
    }

    setSearchValue(e.target.value);
  };

  const closeSearch = () => {
    setIsSearchClicked(false);
    setProducts([]);
    setFiltredProducts([]);
    setSearchValue("");
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
          <input type="text" className={styles.input} onChange={handleChange} />
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
