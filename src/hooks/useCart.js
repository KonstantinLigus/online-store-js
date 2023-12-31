"use client";
import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  const countTotalPrice = value => {
    let total = 0;
    for (let i of value) {
      let price;
      i.prices[i.measure].actionPrice
        ? (price = i.prices[i.measure].actionPrice)
        : (price = i.prices[i.measure].price);
      total += price * i.quantity;
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    let storedProducts = localStorage.getItem("cart");
    setCart(() => {
      return storedProducts ? JSON.parse(storedProducts) : [];
    });
    if (storedProducts) {
      let products = JSON.parse(storedProducts);
      countTotalPrice(products);
      setCartLength(products.length);
    }
  }, []);

  const addToCart = (item, measure = 0, quantity = 1) => {
    const updatedCart = [...cart, { ...item, measure, quantity }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    countTotalPrice(updatedCart);
    setCartLength(updatedCart.length);
  };

  const removeFromCart = id => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    countTotalPrice(updatedCart);
    setCartLength(updatedCart.length);
  };

  const updateCartItem = (item, measure, quantity) => {
    const updatedCart = [...cart];
    const itemIndex = cart.indexOf(cart.find(i => i._id === item._id));
    updatedCart[itemIndex].measure = measure;
    updatedCart[itemIndex].quantity = quantity;
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    countTotalPrice(updatedCart);
  };

  const removeCart = () => {
    localStorage.removeItem("cart");
    setCart(null);
  };

  return {
    totalPrice,
    cart,
    cartLength,
    addToCart,
    removeFromCart,
    updateCartItem,
    removeCart,
  };
};
