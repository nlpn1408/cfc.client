// app/components/CartInitializer.tsx
"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartFromLocalStorage } from "@/redux/features/cartSlice";
import { CartItem } from "@/types/product";

const CartInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        const items: CartItem[] = JSON.parse(stored);
        dispatch(setCartFromLocalStorage(items));
      } catch (err) {
        console.error("Lỗi khi đọc giỏ hàng:", err);
      }
    }
  }, [dispatch]);

  return null;
};

export default CartInitializer;
