"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { Pagination } from "swiper/modules";

const ProductList = ({ title, className }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("api/items");
      const { items } = await res.json();
      setData(items);
    };
    fetchData();
  }, []);

  return (
    <>
      {data.length > 0 && (
        <div className={`${styles.productList} ${className}`}>
          <h2 className={styles.title}>{title}</h2>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            slidesPerView={2}
            spaceBetween={8}
            navigation={true}
            modules={[Pagination]}
            loop={true}
            className={styles.mySwiper}
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
        </div>
      )}
    </>
  );
};
export default ProductList;
