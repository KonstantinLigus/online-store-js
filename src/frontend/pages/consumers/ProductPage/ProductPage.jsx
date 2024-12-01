"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import Image from "next/image";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";
import LikeIcon from "@/frontend/components/consumers/LikeIcon/LikeIcon";
import PathToPage from "@/frontend/components/consumers/PathToPage/PathToPage";
import Slider from "@/frontend/components/consumers/ProductPageComponents/Slider";
import Reviews from "@/frontend/components/consumers/ProductPageComponents/Reviews";

const ProductPage = ({ params, token, item, comments }) => {
  const [data, setData] = useState(item);
  const { cart, addToCart, removeFromCart } = useCart();
  const relateCategoriesFilter = item.relatedCategories
    .map(category => `category=${category}`)
    .join("&");

  const [productIsAvailable, setProductIsAvailable] = useState(true);
  const [reviews, setReviews] = useState(comments);

  const getComments = useCallback(async () => {
    const res = await fetch(`api/comments/${params.id}`);
    const comments = await res.json();
    setReviews(comments);
  }, [params.id]);

  // useEffect(() => {
  //   getComments();
  // }, [getComments]);

  const cartChecker = id => {
    return cart?.some(cartItem => cartItem._id === id);
  };

  const [measure, setMeasure] = useState(0);

  return (
    data && (
      <>
        <PathToPage
          categories={true}
          category={data.category}
          product={data.title}
        />

        <div className={styles.product}>
          <div
            className={`${styles.product__container} ${styles.product__container_row}`}
          >
            <div className={styles.product__image}>
              {data.images.length > 1 ? (
                <Slider images={data.images} />
              ) : (
                <Image
                  className={styles.product__imageImg}
                  src={data.mainImage}
                  fill
                  alt="product image"
                />
              )}
              <div className={styles.product__imageLike}>
                <LikeIcon productId={data._id} />
              </div>
            </div>

            <div className={styles.product__container}>
              <section className={styles.product__container}>
                <h1 className={styles.product__title}>{data.title}</h1>

                {data.prices[0].actionPrice ? (
                  <>
                    <p className={styles.product__price}>
                      <span>{data.prices[measure].price} грн</span>
                      {data.prices[measure].actionPrice} грн
                    </p>
                  </>
                ) : (
                  <p className={styles.product__price}>
                    {data.prices[measure].price} грн
                  </p>
                )}

                <div className={styles.product__measure}>
                  {data.prices.map((item, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        name="measurement"
                        id={index}
                        className={styles.product__measureRadioBtn}
                        checked={index === measure}
                        onChange={() => setMeasure(index)}
                        hidden
                      />
                      <label
                        htmlFor={index}
                        className={styles.product__measureLabel}
                      >
                        {item.value}
                        {item.unit}
                      </label>
                    </div>
                  ))}
                </div>

                {productIsAvailable ? (
                  <p
                    className={`${styles.product__text} ${styles.product__text_green}`}
                  >
                    Є в наявності!
                  </p>
                ) : (
                  <p
                    className={`${styles.product__text} ${styles.product__text_red}`}
                  >
                    Нема в наявності
                  </p>
                )}
              </section>

              <div
                className={`${styles.product__container} ${styles.product__container_columnReverse}`}
              >
                <Button
                  title={
                    cartChecker(data._id)
                      ? "Видалити з кошика"
                      : "Додати до кошика"
                  }
                  onClick={
                    cartChecker(data._id)
                      ? () => removeFromCart(data._id)
                      : () => addToCart(data, measure)
                  }
                />

                <section className={styles.product__container}>
                  <h2 className={styles.product__subtitle}>Характеристики</h2>

                  <ul>
                    {data.condition && (
                      <li className={styles.product__listItem}>
                        <p
                          className={`${styles.product__text} ${styles.product__text_medium}`}
                        >
                          Умови зберігання:
                        </p>
                        <p className={styles.product__text}>{data.condition}</p>
                      </li>
                    )}

                    {data.term && (
                      <li className={styles.product__listItem}>
                        <p
                          className={`${styles.product__text} ${styles.product__text_medium}`}
                        >
                          Термін зберігання:
                        </p>
                        <p className={styles.product__text}>{data.term}</p>
                      </li>
                    )}

                    {data.producer && (
                      <li className={styles.product__listItem}>
                        <p
                          className={`${styles.product__text} ${styles.product__text_medium}`}
                        >
                          Виробник:
                        </p>
                        <p className={styles.product__text}>{data.producer}</p>
                      </li>
                    )}

                    {data.sort && (
                      <li className={styles.product__listItem}>
                        <p
                          className={`${styles.product__text} ${styles.product__text_medium}`}
                        >
                          Сорт:
                        </p>
                        <p className={styles.product__text}>{data.sort}</p>
                      </li>
                    )}
                  </ul>
                </section>
              </div>
            </div>
          </div>

          {data.description && (
            <section className={styles.product__container}>
              <h2 className={styles.product__subtitle}>Опис</h2>
              <p className={styles.product__text}>{data.description}</p>
            </section>
          )}

          {data.suitFor && (
            <section className={styles.product__container}>
              <p className={styles.product__subtitleSuits}>
                Ідеально підходять для:
              </p>
              <ul>
                {data.suitFor.map((item, index) => (
                  <li key={index} className={styles.product__listItemSuitsFor}>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <Reviews
          reviews={reviews}
          getComments={getComments}
          token={token}
          itemId={params.id}
        />

        <ProductList
          className={styles.productList}
          title="З цим товаром купують"
          products={relateCategoriesFilter}
        />
      </>
    )
  );
};

export default ProductPage;
