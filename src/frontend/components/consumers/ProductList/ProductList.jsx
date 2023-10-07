"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "@/frontend/components/consumers/ProductItem/ProductItem";
import { Pagination } from "swiper/modules";
import { useCart } from "@/hooks/useCart";
import Button from "@/frontend/components/consumers/Button/Button";

const ProductList = ({ title, className }) => {
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
                  id={item._id}
                  title={item.title}
                  price={item.price}
                  mainImage={item.mainImage}
                  unit={item.unit}
                >
                  {cartChecker(item._id) ? (
                    <Button
                      title="З кошика"
                      onClick={() => removeFromCart(item._id)}
                    />
                  ) : (
                    <Button title="До кошика" onClick={() => addToCart(item)} />
                  )}
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
