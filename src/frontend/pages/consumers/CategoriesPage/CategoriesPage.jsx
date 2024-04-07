"use client";
import React, { useEffect, useState } from "react";
import styles from "./CategoriesPage.module.scss";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";
import Link from "next/link";
import ToPreviousPage from "@/frontend/components/consumers/ToPreviousPage/ToPreviousPage";
import SortAndFilter from "@/frontend/components/consumers/SortAndFilter/SortAndFilter";
/*
const allCategories = {
  vegetables: "овочі",
  fruits: "фрукти та ягоди",
  nuts: "горіхи",
  grocery: "бакалія",
  conservation: "консервація",
  milk: "молоко",
};
*/

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
  const [productsByCategories, setProductsByCategories] = useState([]);
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
      for (let j of i.category) {
        if (allCategories.includes(j)) productsByCategories[j].push(i);
      }
    }

    for (let i of Object.keys(productsByCategories)) {
      if (productsByCategories[i].length === 0) delete productsByCategories[i];
    }

    //console.log(productsByCategories);
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
    };
    fetchData();
  }, []);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <div className={styles.categories}>
      <ToPreviousPage />
      <SortAndFilter
        sortedProducts={sortedProducts}
        setSortedProducts={setSortedProducts}
        filtredProducts={filtredProducts}
        setFiltredProducts={setFiltredProducts}
      />
      {Object.keys(productsByCategories).map((item, index) => (
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
      ))}
    </div>
  );
};

export default CategoriesPage;

/*
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

          <ul className={styles.products}>
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
          </ul>
        </div>
      ))}
    </div>
  );
};

*/
