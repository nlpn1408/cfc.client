// "use client";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import OrderSummary from "@/components/OrderSummary";
// import { ArrowLeftIcon } from "lucide-react";
// import Link from "next/link";
// import { removeFromCart } from "@/redux/features/cartSlice";
// import { RootState } from "@/redux/store";

// // Đảm bảo rằng cartItem và product đều có kiểu dữ liệu rõ ràng
// const Cart = () => {
//   const dispatch = useDispatch();
//   const { cartItems, totalQuantity } = useSelector(
//     (state: RootState) => state.cart
//   );

//   const handleRemoveItem = (productId: string) => {
//     dispatch(removeFromCart(productId));
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
//       <div className="flex-1">
//         <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
//           <p className="text-2xl md:text-3xl text-gray-500">
//             Your <span className="font-medium text-orange-600">Cart</span>
//           </p>
//           <p className="text-lg md:text-xl text-gray-500/80">
//             {totalQuantity} Items
//           </p>
//         </div>
//         {cartItems.length === 0 ? (
//           <p className="text-gray-500 text-center">Your cart is empty</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead className="text-left">
//                 <tr>
//                   <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
//                     Product
//                   </th>
//                   <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
//                     Price
//                   </th>
//                   <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
//                     Quantity
//                   </th>
//                   <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
//                     Subtotal
//                   </th>
//                   <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => (
//                   <tr key={item.productId}>
//                     <td className="py-6 px-4 text-gray-600 flex items-center">
//                       <img
//                         src={item.product.images}
//                         alt={item.product.name || "Product"}
//                         className="w-16 h-16 object-cover mr-4"
//                       />
//                       <span>{item.product.name || "Unknown Product"}</span>
//                     </td>
//                     <td className="py-6 px-4 text-gray-600">${item.price}</td>
//                     <td className="py-6 px-4 text-gray-600">{item.quantity}</td>
//                     <td className="py-6 px-4 text-gray-600">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </td>
//                     <td className="py-6 px-4">
//                       <button
//                         onClick={() => handleRemoveItem(item.productId)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         <Link href="/">
//           <button className="group flex items-center mt-6 gap-2 text-orange-600">
//             <ArrowLeftIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//             Continue Shopping
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Cart;
