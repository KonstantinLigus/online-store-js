"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductPage.module.scss";
import Image from "next/image";
import product from "../../../../../public/assets/product.png";
import heart from "../../../../../public/assets/icon/heart-icon.svg";
import information from "../../../../../public/assets/icon/information-line-icon.svg";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";

const characteristic = [
  {
    id: 0,
    title: "Умови зберігання:",
    description: "температура від +2 до +5; вологість 85-90%",
  },
  {
    id: 1,
    title: "Термін зберігання:",
    description: "3-5 днів",
  },
  {
    id: 2,
    title: "Країна походження:",
    description: "Іспанія, Греція",
  },
];

const ProductPage = props => {
  const productId = props.product;

  const [data, setData] = useState([]);
  useEffect(() => {
    /*
const getItemById = await getItemsController("GET_ONE_ITEM");
  const { item } = await getItemById(id);
*/
    const fetchData = async () => {
      const res = await fetch("api/items");
      const { items } = await res.json();
      let currentProduct = items.find(item => item._id == productId);
      // тут отримуємо всі елементи, а після цього знаходимо потрібний за id
      // думаю, що краще мати конкретний запит до бази даних за id

      setData(currentProduct);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.productCard}>
      <h2 className={styles.productName}>{data.title}</h2>
      <div className={styles.imageContainer}>
        <Image
          className={styles.imageProduct}
          src={product}
          /*src={data.mainImage}* - дивна поведінка: картинка відображається, а консоль пише, що зображення не має src*/
          alt="product"
          fill
        />
        <div className={styles.heartIconContainer}>
          <Image
            src={heart}
            alt="heart-icon"
            fill
            className={styles.heartIcon}
          />
        </div>
      </div>
      <div className={styles.priceInformation}>
        <p className={styles.price}>{data.price}</p>
        <p className={styles.measure}>1 кг</p>
      </div>
      <button className={styles.button}>Додати в кошик</button>

      <div className={styles.characteristic}>
        <h2 className={styles.headline}>Характеристики</h2>

        {characteristic.map(item => (
          <div key={item.id}>
            <div className={styles.heading}>
              <Image src={information} alt="information" width={14} />
              <h2 className={styles.title}>{item.title}</h2>
            </div>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
      <ProductList
        className={styles.productList}
        title="З цим товаром купують"
      />
    </div>
  );
};

export default ProductPage;
