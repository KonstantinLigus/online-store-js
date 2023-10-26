"use client";
import React from "react";
import Image from "next/image";
import styles from "./ProductsInCart.module.scss";
import CartItem from "@/frontend/components/consumers/CartItem/CartItem";
import deleteIcon from "public/assets/icon/cart-delete.svg";

const ProductsInCart = props => {
  return (
    <ul className={styles.cartPage}>
      {props.cart.map(item => (
        <CartItem
          className={styles.cartItem}
          key={item._id}
          id={item._id}
          {...item}
        >
          <Image
            className={styles.deleteIcon}
            src={deleteIcon}
            alt="delete-icon"
            onClick={() => props.removeFromCart(item._id)}
            width={20}
          />
        </CartItem>
      ))}
    </ul>
  );
};

export default ProductsInCart;
