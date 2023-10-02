import React, { useEffect, useState } from "react";
import styles from "./CategoryPage.module.scss";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";

const CategoryPage = props => {
  const allCategories = {
    vegetables: "овочі",
    fruits: "фрукти та ягоди",
    nuts: "горіхи",
    grocery: "бакалія",
    conservation: "консервація",
    milk: "молоко",
  };
  const currentCategory = allCategories[props.category];

  const [data, setData] = useState([]);
  /* далі йде запит на сервер на отримання всіх продуктів. 
  Але фактично треба вибрати тільки продукти певноїх категорії. 
  Потрібно запит за категорією, і відповідно більшу базу даних)))*/
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/items");
      const { items } = await res.json();
      setData(items);
      //console.log(items);
    };
    fetchData();
  }, []);

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
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
