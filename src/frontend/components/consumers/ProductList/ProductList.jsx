"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";

const ProductList = ({ title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { items } = await fetch("api/items");
      const data = await items.json();
      setData(data);
      console.log(data);
    };
    fetchData();
  }, []);
  // //
  // useEffect(() => {
  //   fetch("api/items")
  //     .then(({ items }) => items.json())
  //     .then(data => {
  //       setData(data);
  //       console.log(data);
  //     });
  // }, []);

  return (
    <div className={styles.productList}>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
        >
          {data.map(item => (
            <SwiperSlide key={item._id}>
              <ProductItem
                title={item.title}
                price={item.price}
                mainImage={item.mainImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </ul>
      {/*<p className={styles.navigation}>&lt; 1/5 &gt;</p>*/}
    </div>
  );
};
export default ProductList;
