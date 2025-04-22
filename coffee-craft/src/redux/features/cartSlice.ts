// src/redux/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/types/product";

// Helper: Lưu vào localStorage (chỉ client-side)
const saveToLocalStorage = (cartItems: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
};

// State ban đầu KHÔNG đọc từ localStorage
const initialState: CartState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromLocalStorage(state, action: PayloadAction<CartItem[]>) {
      state.cartItems = action.payload;
      cartSlice.caseReducers.calculateTotals(state);
    },

    addToCart(state, action: PayloadAction<CartItem>) {
      const existingIndex = state.cartItems.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.variant?.id === action.payload.variant?.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }

      cartSlice.caseReducers.calculateTotals(state);
      saveToLocalStorage(state.cartItems);
    },

    removeFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      cartSlice.caseReducers.calculateTotals(state);
      saveToLocalStorage(state.cartItems);
    },

    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const item = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      cartSlice.caseReducers.calculateTotals(state);
      saveToLocalStorage(state.cartItems);
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveToLocalStorage([]);
    },

    calculateTotals(state) {
      state.totalQuantity = state.cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.totalPrice = state.cartItems.reduce(
        (acc, item) =>
          acc +
          item.quantity *
            parseFloat(item.variant?.discountPrice?.toString() || "0"), // Chuyển discountPrice thành string
        0
      );
    },
  },
});

export const {
  setCartFromLocalStorage,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
