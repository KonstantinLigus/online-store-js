"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import Image from "next/image";
import heart from "public/assets/icon/heart-icon.svg";
import information from "public/assets/icon/information-line-icon.svg";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";

const ProductPage = ({ params }) => {
  const [data, setData] = useState(null);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`api/items/${params.id}`);
      const { item } = await res.json();
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
      <div className={styles.productCard}>
        <h2 className={styles.productName}>{data.title}</h2>

        <div className={styles.imageContainer}>
          <Image
            className={styles.imageProduct}
            src={data.mainImage}
            fill
            alt="product image"
          />
          <div className={styles.heartIconContainer}>
            <Image
              src={heart}
              alt="heart icon"
              fill
              className={styles.heartIcon}
            />
          </div>
        </div>

        <div className={styles.priceInformation}>
          <p className={styles.price}>{data.price[measure]} грн</p>

          <div className={styles.measure}>
            {data.measurement.values.map((item, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name="measurement"
                  id={index}
                  className={styles.measureRadioBtn}
                  checked={index === measure}
                  onChange={() => setMeasure(index)}
                />
                <label htmlFor={index} className={styles.measureLabel}>
                  {item}
                  {data.measurement.unit}
                </label>
              </div>
            ))}
          </div>
        </div>

        {cartChecker(data._id) ? (
          <Button
            className={styles.button}
            title="Видалити з кошика"
            onClick={() => removeFromCart(data._id)}
          />
        ) : (
          <Button
            className={styles.button}
            title="Додати в кошик"
            onClick={() => addToCart(data, measure)}
          />
        )}

        <div className={styles.characteristic}>
          <h2 className={styles.headline}>Характеристики</h2>
          <div>
            <div className={styles.heading}>
              <Image src={information} alt="information" width={14} />
              <h2 className={styles.title}>Умови зберігання:</h2>
            </div>
            <p className={styles.description}>{data.description}</p>
            <div className={styles.heading}>
              <Image src={information} alt="information" width={14} />
              <h2 className={styles.title}>Термін зберігання:</h2>
            </div>
            <p className={styles.description}>3-5 днів</p>
            <div className={styles.heading}>
              <Image src={information} alt="information" width={14} />
              <h2 className={styles.title}>Місце походження:</h2>
            </div>
            <p className={styles.description}>{data.producer}</p>
          </div>
        </div>

        <ProductList
          className={styles.productList}
          title="З цим товаром купують"
        />
      </div>
    )
  );
};

export default ProductPage;
