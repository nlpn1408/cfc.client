// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import voucherReducer from "./features/voucherSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    voucher: voucherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
