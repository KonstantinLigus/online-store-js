"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoryPage.module.scss";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";
import PathToPage from "@/frontend/components/consumers/PathToPage/PathToPage";
import SortAndFilter from "@/frontend/components/consumers/SortAndFilter/SortAndFilter";
import NoFiltredProducts from "@/frontend/components/consumers/SortAndFilter/NoFiltredProducts";

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
  const [filtredProductsLength, setFiltredProductsLength] = useState(1);
  const [producers, setProducers] = useState([]);
  const [sortingValue, setSortingValue] = useState("Спочатку популярні");
  const { cart, addToCart, removeFromCart } = useCart();
  const currentCategory = allCategories[params.name];

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `../api/itemsAllFields?category=${currentCategory}`,
      );
      const { items } = await res.json();
      items.sort(function (a, b) {
        if (a.label.includes("популярні") < b.label.includes("популярні")) {
          return 1;
        }
        if (a.label.includes("популярні") > b.label.includes("популярні")) {
          return -1;
        }
        return 0;
      });
      setSortedProducts(items);
      setFiltredProducts(items);

      let producersList = [];
      for (let i of items) producersList.push(i.producer);
      let allProducers = Array.from(new Set(producersList));
      allProducers = allProducers.map(i => ({
        id: i.toString().split(" ").join("") + "producer",
        producer: i,
        selected: false,
      }));
      setProducers(allProducers);
    };
    fetchData();
  }, [currentCategory]);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <div className={styles.category}>
      <PathToPage
        categories={true}
        category={currentCategory}
        product={false}
      />
      <SortAndFilter
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        filtredProducts={filtredProducts}
        setFiltredProducts={setFiltredProducts}
        setFiltredProductsLength={setFiltredProductsLength}
        categories={[]}
        producers={producers}
        sortingValue={sortingValue}
        setSortingValue={setSortingValue}
      />

      {filtredProductsLength > 0 ? (
        <>
          <h2 className={styles.title}>{currentCategory}</h2>

          <ul className={styles.products}>
            {filtredProducts.map(item => (
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
        </>
      ) : (
        <NoFiltredProducts />
      )}
    </div>
  );
};

export default CategoryPage;
