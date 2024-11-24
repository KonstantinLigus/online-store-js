"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoriesPage.module.scss";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";
import Link from "next/link";
import PathToPage from "@/frontend/components/consumers/PathToPage/PathToPage";
import SortAndFilter from "@/frontend/components/consumers/SortAndFilter/SortAndFilter";
import NoFiltredProducts from "@/frontend/components/consumers/SortAndFilter/NoFiltredProducts";

const allCategories = [
  "овочі",
  "фрукти та ягоди",
  "горіхи",
  "бакалія",
  "консервація",
  "молоко",
];

const linkCategories = {
  овочі: "vegetables",
  "фрукти та ягоди": "fruits",
  горіхи: "nuts",
  бакалія: "grocery",
  консервація: "conservation",
  молоко: " milk",
};

const CategoriesPage = () => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const [filtredProducts, setFiltredProducts] = useState([]);
  const [filtredProductsLength, setFiltredProductsLength] = useState(1);
  const [productsByCategories, setProductsByCategories] = useState([]);
  const [producers, setProducers] = useState([]);
  const [sortingValue, setSortingValue] = useState("Спочатку популярні");
  const { cart, addToCart, removeFromCart } = useCart();

  const sortByCategories = list => {
    let productsByCategories = {
      овочі: [],
      "фрукти та ягоди": [],
      горіхи: [],
      бакалія: [],
      консервація: [],
      молоко: [],
    };

    for (let i of list) {
      if (allCategories.includes(i.category))
        productsByCategories[i.category].push(i);
    }

    for (let i of Object.keys(productsByCategories)) {
      if (productsByCategories[i].length === 0) delete productsByCategories[i];
    }

    return productsByCategories;
  };

  useEffect(() => {
    setProductsByCategories(sortByCategories(filtredProducts));
  }, [sortedProducts, filtredProducts]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/itemsAllFields");
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
      setProductsByCategories(sortByCategories(items));

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
  }, []);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <div className={styles.categories}>
      <PathToPage pageTitle={"Всі товари"} />
      <SortAndFilter
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        filtredProducts={filtredProducts}
        setFiltredProducts={setFiltredProducts}
        setFiltredProductsLength={setFiltredProductsLength}
        categories={allCategories}
        producers={producers}
        sortingValue={sortingValue}
        setSortingValue={setSortingValue}
      />
      {filtredProductsLength > 0 ? (
        Object.keys(productsByCategories).map((item, index) => (
          <div key={index} className={styles.category}>
            <h2 key={index} className={styles.category__name}>
              <Link href={`/category/${linkCategories[item]}`}>{item}</Link>
            </h2>

            <ul className={styles.products}>
              {productsByCategories[item].map(item => (
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
        ))
      ) : (
        <NoFiltredProducts />
      )}
    </div>
  );
};

export default CategoriesPage;
