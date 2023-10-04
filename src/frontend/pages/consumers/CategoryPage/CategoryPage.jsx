"use client";

import styles from "./CategoryPage.module.scss";

const CategoryPage = ({ params }) => {
  return (
    <div className={styles.productCard}>
      <h2 className={styles.productName}>{params.name}</h2>
    </div>
  );
};

export default CategoryPage;
