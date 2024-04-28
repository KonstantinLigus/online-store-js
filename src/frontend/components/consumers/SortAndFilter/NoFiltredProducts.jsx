import React from "react";
import styles from "./NoFiltredProducts.module.scss";

const NoFiltredProducts = () => {
  return (
    <div className={styles.container}>
      <p style={{ fontSize: "1.5rem" }}>
        Товарів не знайдено. Спробуйте змінити параметри пошуку.
      </p>
    </div>
  );
};

export default NoFiltredProducts;
