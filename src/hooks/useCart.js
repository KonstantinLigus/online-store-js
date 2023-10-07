"use client";
import { useEffect, useState } from "react";

export const useCart = () => {
  const [cart, setCart] = useState(() => {
    const storedProducts = localStorage.getItem("cart");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = item => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
  };
  const removeFromCart = id => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
  };

  return { cart, addToCart, removeFromCart };
};
