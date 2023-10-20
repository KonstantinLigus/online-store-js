"use client";
import React from "react";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/frontend/components/consumers/CartItem/CartItem";
import deleteIcon from "public/assets/icon/cart-delete.svg";
import Image from "next/image";
import styles from "./CartPage.module.scss";
import Order from "@/frontend/components/consumers/Order/Order";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import { useState } from "react";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();
  const [order, setOrder] = useState(false);

  return (
    <main>
      <div className={styles.back}>
        <button
          type="button"
          onClick={() => history.back()}
          className={styles.arrow}
        >
          &#129120;
        </button>
      </div>
      <ul className={styles.cartPage}>
        {cart.length > 0 ? (
          cart.map(item => (
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
                onClick={() => removeFromCart(item._id)}
                width={20}
              />
            </CartItem>
          ))
        ) : (
          <h1 className={styles.warning}>Ви ще нічого не додали в кошик!</h1>
        )}
      </ul>

      {cart.length > 0 && (
        <div className={styles.cartFooter}>
          <div className={styles.order}>
            <div className={styles.headline}>
              <p className={styles.caption}>Всього до сплати:</p>
              <p className={styles.sum}>215$</p>
            </div>
            {!order && (
              <button
                className={styles.button}
                onClick={() => {
                  setOrder(true);
                }}
              >
                Оформити замовлення
              </button>
            )}
          </div>
        </div>
      )}

      {order && <Order closeOrder={setOrder} setOrder={setOrder} />}

      {order && (
        <ProductList
          className={styles.productList}
          title="Вас може зацікавити:"
        />
      )}
    </main>
  );
};
export default CartPage;
