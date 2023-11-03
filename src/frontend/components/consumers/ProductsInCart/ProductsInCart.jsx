"use client";
import React from "react";
import Image from "next/image";
import styles from "./ProductsInCart.module.scss";
import CartItem from "@/frontend/components/consumers/CartItem/CartItem";

const ProductsInCart = props => {
  return (
    <ul className={styles.cartPage}>
      {props.cart.map(item => (
        <CartItem
          className={styles.cartItem}
          key={item._id}
          item={item}
          removeFromCart={props.removeFromCart}
          updateCartItem={props.updateCartItem}
        />
      ))}
    </ul>
  );
};

export default ProductsInCart;
