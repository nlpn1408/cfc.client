// import { createContext, useContext, useState, ReactNode } from "react";

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   increaseQuantity: (id: number) => void;
//   decreaseQuantity: (id: number) => void;
//   removeFromCart: (id: number) => void;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = (item: CartItem) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
//       if (existingItem) {
//         return prevCart.map((cartItem) =>
//           cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
//         );
//       }
//       return [...prevCart, { ...item, quantity: 1 }];
//     });
//   };

//   const increaseQuantity = (id: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (id: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
//       ).filter((item) => item.quantity > 0)
//     );
//   };

//   const removeFromCart = (id: number) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };
