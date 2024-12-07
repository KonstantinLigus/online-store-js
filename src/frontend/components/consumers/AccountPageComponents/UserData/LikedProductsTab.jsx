"use client";
import React, { useState, useEffect } from "react";
import styles from "./Tab.module.scss";
import { useLike } from "@/hooks/useLike";
import { useCart } from "@/hooks/useCart";
import ProductItem from "../../ProductItem/ProductItem";
import Button from "../../Button/Button";

const LikedProductsTab = () => {
  const { liked } = useLike();
  const [data, setData] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/items");
      const { items } = await res.json();
      setData(items);
    };
    fetchData();
  }, []);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <div className={styles.likedProducts}>
      <p className={styles.tab__title}>Список бажань</p>
      <ul className={styles.likedProducts__list}>
        {data
          .filter(i => liked.includes(i._id))
          .map(item => (
            <ProductItem key={item._id} id={item._id} {...item}>
              <Button
                title={cartChecker(item._id) ? "З кошика" : "До кошика"}
                onClick={
                  cartChecker(item._id)
                    ? () => removeFromCart(item._id)
                    : () => addToCart(item)
                }
                secondary={true}
              />
            </ProductItem>
          ))}
      </ul>
    </div>
  );
};
export default LikedProductsTab;
