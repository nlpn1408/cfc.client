// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { CartState, Product } from "../../types/product";

// // Hàm lưu giỏ hàng vào localStorage
// const saveCartToLocalStorage = (cartState: CartState) => {
//   if (typeof window !== "undefined") {
//     localStorage.setItem("cart", JSON.stringify(cartState));
//   }
// };

// // Hàm tải giỏ hàng từ localStorage
// export const loadCartFromLocalStorage = (): CartState => {
//   if (typeof window !== "undefined") {
//     const storedCart = localStorage.getItem("cart");
//     return storedCart
//       ? JSON.parse(storedCart)
//       : { cartItems: [], totalQuantity: 0, totalPrice: 0 };
//   }
//   return { cartItems: [], totalQuantity: 0, totalPrice: 0 };
// };

// // Khởi tạo state từ localStorage
// const initialState: CartState = loadCartFromLocalStorage();

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (
//       state,
//       action: PayloadAction<{ product: Product; quantity: number }>
//     ) => {
//       const { product, quantity } = action.payload;
//       const quantityToAdd = Math.max(1, quantity);

//       const existingItem = state.cartItems.find(
//         (item) => item.productId === product.id
//       );

//       if (existingItem) {
//         existingItem.quantity += quantityToAdd;
//       } else {
//         state.cartItems.push({
//           id: crypto.randomUUID(),
//           productId: product.id,
//           images:
//             product.images?.map((image, index) => ({
//               id: crypto.randomUUID(), // Tạo id ngẫu nhiên cho mỗi ảnh
//               isThumbnail: index === 0, // Giả sử ảnh đầu tiên là ảnh thu nhỏ
//               url: image.url, // Chắc chắn rằng đây là chuỗi URL
//             })) || [],
//           product, // ✅ Thêm thông tin sản phẩm vào cart
//           quantity: quantityToAdd,
//           price: Number(product.price),
//         });
//       }

//       state.totalQuantity += quantityToAdd;
//       state.totalPrice += Number(product.price) * quantityToAdd;

//       saveCartToLocalStorage(state); // Lưu vào localStorage sau khi cập nhật
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       const itemToRemove = state.cartItems.find(
//         (item) => item.productId === action.payload
//       );
//       if (itemToRemove) {
//         state.totalQuantity -= itemToRemove.quantity;
//         state.totalPrice -= itemToRemove.price * itemToRemove.quantity;

//         state.cartItems = state.cartItems.filter(
//           (item) => item.productId !== action.payload
//         );
//       }
//       saveCartToLocalStorage(state);
//     },
//     updateCartItemQuantity: (
//       state,
//       action: PayloadAction<{ productId: string; quantity: number }>
//     ) => {
//       const item = state.cartItems.find(
//         (item) => item.productId === action.payload.productId
//       );
//       if (item) {
//         const oldQuantity = item.quantity;
//         item.quantity = action.payload.quantity;

//         state.totalQuantity += action.payload.quantity - oldQuantity;
//         state.totalPrice +=
//           (action.payload.quantity - oldQuantity) * item.price;
//       }
//       saveCartToLocalStorage(state);
//     },
//     clearCart: (state) => {
//       state.cartItems = [];
//       state.totalQuantity = 0;
//       state.totalPrice = 0;
//       saveCartToLocalStorage(state);
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } =
//   cartSlice.actions;
// export default cartSlice.reducer;
