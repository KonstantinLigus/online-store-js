"use client";
import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(() => {
      let storedProducts = localStorage.getItem("cart");
      return storedProducts ? JSON.parse(storedProducts) : [];
    });
  }, []);
  /*
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
*/
  const addToCart = (item, measure = 0, quantity = 1) => {
    //const updatedCart = [...cart, item];
    const updatedCart = [...cart, { ...item, measure, quantity }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = id => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateCartItem = (id, measure, quantity) => {
    const currentItem = cart.find(i => i._id === id);
    currentItem.measure = measure;
    console.log(currentItem.title, " ", measure);
    currentItem.quantity = quantity;
    const cartWithouthItem = cart.filter(i => i._id !== id);
    const updatedCart = [...cartWithouthItem, currentItem];
    //console.log(updatedCart);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return { cart, addToCart, removeFromCart, updateCartItem };
};
