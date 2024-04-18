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
      setSortedProducts(items);
      setFiltredProducts(items);
      setProductsByCategories(sortByCategories(items));

      const producers = await fetch("api/producers");
      let data = await producers.json();
      let producersList = [];
      for (let i of data)
        producersList.push({ id: i._id, producer: i.name, selected: false });
      setProducers(producersList);
    };
    fetchData();
  }, []);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <div className={styles.categories}>
      <PathToPage />
      <SortAndFilter
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        filtredProducts={filtredProducts}
        setFiltredProducts={setFiltredProducts}
        setFiltredProductsLength={setFiltredProductsLength}
        categories={allCategories}
        producers={producers}
      />
      {filtredProductsLength > 0 ? (
        Object.keys(productsByCategories).map((item, index) => (
          <div key={index} className={styles.category}>
            <h2 key={index} className={styles.categoryName}>
              <Link href={`/category/${linkCategories[item]}`}>{item}</Link>
            </h2>

            <ul className={styles.products}>
              {productsByCategories[item].map(item => (
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
        ))
      ) : (
        <NoFiltredProducts />
      )}
    </div>
  );
};

export default CategoriesPage;
