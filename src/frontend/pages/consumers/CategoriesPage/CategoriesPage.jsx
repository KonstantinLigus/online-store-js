"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoriesPage.module.scss";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";
import Link from "next/link";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";

const allCategories = {
  vegetables: "овочі",
  fruits: "фрукти та ягоди",
  nuts: "горіхи",
  grocery: "бакалія",
  conservation: "консервація",
  milk: "молоко",
};

/*
const allCategories = [
  "овочі",
  "фрукти та ягоди",
  "горіхи",
  "бакалія",
  "консервація",
  "молоко",
];
*/
const CategoriesPage = () => {
  const [data, setData] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      let products = [];

      const vegetables = await fetch("../api/items?category=овочі");
      const fruits = await fetch("../api/items?category=фрукти");
      const nuts = await fetch("../api/items?category=горіхи");
      const grocery = await fetch("../api/items?category=бакалія");
      const conservation = await fetch("../api/items?category=консервація");
      const milk = await fetch("../api/items?category=молоко");

      products.push(await vegetables.json());
      products.push(await fruits.json());
      products.push(await nuts.json());
      products.push(await grocery.json());
      products.push(await conservation.json());
      products.push(await milk.json());

      console.log(products[0].items);
      setData(products);
    };
    fetchData();
  }, []);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <div className={styles.categories}>
      <ToPreviousPage />
      {data.map((item, index) => (
        <div key={index} className={styles.category}>
          <h2 key={index} className={styles.categoryName}>
            <Link href={`/category/${Object.keys(allCategories)[index]}`}>
              {Object.values(allCategories)[index]}
            </Link>
          </h2>

          <div className={styles.products}>
            {item.items.map(item => (
              <ProductItem key={item._id} id={item._id} {...item}>
                {cartChecker(item._id) ? (
                  <Button
                    title="З кошика"
                    onClick={() => removeFromCart(item._id)}
                  />
                ) : (
                  <Button title="До кошика" onClick={() => addToCart(item)} />
                )}
              </ProductItem>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesPage;
/*

Object.values(item)


{data.map(item => (
    <ProductItem key={item._id} id={`/${item._id}`} {...item}>
      {cartChecker(item._id) ? (
        <Button
          title="З кошика"
          onClick={() => removeFromCart(item._id)}
        />
      ) : (
        <Button title="До кошика" onClick={() => addToCart(item)} />
      )}
    </ProductItem>
  ))}
*/
