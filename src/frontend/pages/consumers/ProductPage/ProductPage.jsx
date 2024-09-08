"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import Image from "next/image";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";
import LikeIcon from "@/frontend/components/consumers/LikeIcon/LikeIcon";
import PathToPage from "@/frontend/components/consumers/PathToPage/PathToPage";
import Slider from "@/frontend/components/consumers/ProductPageComponents/Slider";
import Reviews from "@/frontend/components/consumers/ProductPageComponents/Reviews";

const productReviews = [
  {
    name: "Пилипчук Дмитро",
    message: "Дуже смачний нектарин, соковитий та солодкий",
    date: "12 травня 2023",
    rating: 5,
  },
  {
    name: "Крилова Марія",
    message: "Замовляю тут неодноразово, якість продукції на висоті!",
    date: "1 липня  2023",
    rating: 4,
  },
];

const ProductPage = ({ params }) => {
  const [data, setData] = useState(null);
  const { cart, addToCart, removeFromCart } = useCart();

  const [productIsAvailable, setProductIsAvailable] = useState(true);
  const [reviews, setReviews] = useState(productReviews);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`api/items/${params.id}`);
      const { item } = await res.json();
      console.log(item.suitFor);
      setData(item);
    };
    fetchData();
  }, [params.id]);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
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
                {cartChecker(data._id) ? (
                  <Button
                    className={styles.product__buttonCart}
                    title="Видалити з кошика"
                    onClick={() => removeFromCart(data._id)}
                  />
                ) : (
                  <Button
                    className={styles.product__buttonCart}
                    title="Додати до кошика"
                    onClick={() => addToCart(data, measure)}
                  />
                )}

                <section className={styles.product__container}>
                  <h2 className={styles.product__subtitle}>Характеристики</h2>

                  <ul>
                    {data.condition && (
                      <li className={styles.product__listItem}>
                        <p className={styles.product__text}>
                          Умови зберігання:
                        </p>
                        <p className={styles.product__text}>{data.condition}</p>
                      </li>
                    )}

                    {data.term && (
                      <li className={styles.product__listItem}>
                        <p className={styles.product__text}>
                          Термін зберігання:
                        </p>
                        <p className={styles.product__text}>{data.term}</p>
                      </li>
                    )}

                    {data.producer && (
                      <li className={styles.product__listItem}>
                        <p className={styles.product__text}>Виробник:</p>
                        <p className={styles.product__text}>{data.producer}</p>
                      </li>
                    )}

                    {data.sort && (
                      <li className={styles.product__listItem}>
                        <p className={styles.product__text}>Сорт:</p>
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
              <h2 className={styles.product__subtitle}>
                Ідеально підходять для:
              </h2>
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

        {reviews.length > 0 && <Reviews reviews={reviews} />}

        <ProductList
          className={styles.productList}
          title="З цим товаром купують"
        />
      </>
    )
  );
};

export default ProductPage;
