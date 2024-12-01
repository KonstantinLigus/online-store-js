"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { Pagination } from "swiper/modules";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";

const ProductList = ({ title, products, className }) => {
  const [data, setData] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`../api/itemsAllFields?${products}`);
      const { items } = await res.json();
      setData(items);
    };
    fetchData();
  }, [products]);

  const cartChecker = id => {
    return cart.some(cartItem => cartItem._id === id);
  };

  return (
    <>
      {data?.length > 0 && (
        <div className={`${styles.productList} ${className}`}>
          <h2 className={styles.title}>{title}</h2>
          <Swiper
            pagination={{
              type: "bullets",
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            slidesPerView={1}
            spaceBetween={8}
            modules={[Pagination]}
            loop={true}
            className={styles.productsSwiper}
            breakpoints={{
              310: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
            }}
          >
            {data.map(item => (
              <SwiperSlide key={item._id}>
                <ProductItem id={item._id} {...item}>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};
export default ProductList;
