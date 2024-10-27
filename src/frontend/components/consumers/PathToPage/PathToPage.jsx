"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./PathToPage.module.scss";

const allCategories = {
  овочі: "vegetables",
  "фрукти та ягоди": "fruits",
  горіхи: "nuts",
  бакалія: " grocery",
  консервація: "conservation",
  молоко: "milk",
};

const PathToPage = ({ pageTitle, categories, category, product }) => {
  return (
    <div className={styles.path}>
      <button
        type="button"
        onClick={() => history.back()}
        className={styles.path__button}
      >
        <span className={styles.path__button_image}></span>
      </button>
      <div className={styles.path__text_wrapper}>
        <div className={styles.path__text}>
          <Link
            href="/"
            prefetch={false}
            className={styles.path__linkImage}
          ></Link>
          <span className={styles.path__span}>/</span>
          {categories ? (
            <>
              <Link
                href="/categories"
                prefetch={false}
                className={styles.path__link}
              >
                Всі товари
              </Link>
              <span className={styles.path__span}>&nbsp; /</span>
              {product ? (
                <>
                  <Link
                    href={`/category/${allCategories[category]}`}
                    prefetch={false}
                    className={styles.path__link}
                  >
                    {category[0].toUpperCase() + category.slice(1)}
                  </Link>
                  <span
                    className={`${styles.path__span} ${styles.path__span_black}`}
                  >
                    &nbsp; / {product[0].toUpperCase() + product.slice(1)}
                  </span>
                </>
              ) : (
                <span
                  className={`${styles.path__span} ${styles.path__span_black}`}
                >
                  {category[0].toUpperCase() + category.slice(1)}
                </span>
              )}
            </>
          ) : (
            <span className={`${styles.path__span} ${styles.path__span_black}`}>
              {pageTitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PathToPage;
