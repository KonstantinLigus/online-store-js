"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoryPage.module.scss";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";

const allCategories = {
  vegetables: "овочі",
  fruits: "фрукти та ягоди",
  nuts: "горіхи",
  grocery: "бакалія",
  conservation: "консервація",
  milk: "молоко",
};

const CategoryPage = ({ params }) => {
  const [data, setData] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();
  const currentCategory = allCategories[params.name];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("../api/items");
      const { items } = await res.json();
      console.log(items);
      setData(items);
    };
    fetchData();
  }, []);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <div>
      <h2 className={styles.title}>{currentCategory}</h2>

      <div className={styles.products}>
        {data.map(item => (
          <ProductItem
            key={`/${item._id}`}
            id={`/${item._id}`}
            title={item.title}
            price={item.price}
            mainImage={item.mainImage}
          >
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
  );
};

export default CategoryPage;
