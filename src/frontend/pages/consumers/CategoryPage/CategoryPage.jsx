"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoryPage.module.scss";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import SortAndFilter from "@/frontend/components/consumers/SortAndFilter/SortAndFilter";

const allCategories = {
  vegetables: "овочі",
  fruits: "фрукти та ягоди",
  nuts: "горіхи",
  grocery: "бакалія",
  conservation: "консервація",
  milk: "молоко",
};

const CategoryPage = ({ params }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();
  const currentCategory = allCategories[params.name];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`../api/items?category=${currentCategory}`);
      const { items } = await res.json();
      setSortedProducts(items);
      setFiltredProducts(items);
    };
    fetchData();
  }, [currentCategory]);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <div className={styles.category}>
      <ToPreviousPage title={currentCategory} />
      <SortAndFilter
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        filtredProducts={filtredProducts}
        setFiltredProducts={setFiltredProducts}
      />
      <h2 className={styles.title}>{currentCategory}</h2>

      <ul className={styles.products}>
        {filtredProducts.map(item => (
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
      </ul>
    </div>
  );
};

export default CategoryPage;
