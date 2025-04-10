// components/Checkout/CartSummary.tsx
"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CartSummary = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">
    Thông tin đơn hàng
  </h2>

  {/* Danh sách sản phẩm */}
  <div className="space-y-4 text-sm text-gray-700 mb-4 max-h-64 overflow-y-auto pr-2">
    {cartItems.map((item) => (
      <div
        key={`${item.productId}-${item.grindType || "default"}`}
        className="flex justify-between items-start gap-3"
      >
        <div className="flex items-start gap-3">
          <img
            src={item.images?.[0]?.url || item.product.images?.[0]?.url}
            alt={item.product.name}
            className="w-12 h-12 object-cover rounded-md border"
          />
          <div className="space-y-1">
            <p className="font-medium text-gray-800 text-sm">{item.product.name}</p>
            {item.grindType && (
              <p className="text-xs text-gray-500">Loại xay: {item.grindType}</p>
            )}
            <p className="text-xs text-gray-500">
              {item.quantity} x {item.price.toLocaleString("vi-VN")}₫
            </p>
          </div>
        </div>
        <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
          {(item.price * item.quantity).toLocaleString("vi-VN")}₫
        </span>
      </div>
    ))}
  </div>

  {/* Tổng tiền */}
  <div className="space-y-4 text-sm text-gray-700">
    <div className="flex justify-between">
      <span>Tổng số sản phẩm</span>
      <span className="font-medium">{totalQuantity}</span>
    </div>
    <div className="flex justify-between">
      <span>Tạm tính</span>
      <span>{totalAmount.toLocaleString("vi-VN")}₫</span>
    </div>
    <div className="mt-6">
  <span className="block mb-2 text-sm font-medium text-gray-700">Mã Giảm Giá</span>
  <form className="flex gap-2">
    <input
      type="text"
      placeholder="Nhập mã giảm giá"
      className="flex-1 px-4 py-2 text-sm text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
    <button
      type="submit"
      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all"
    >
      Áp dụng
    </button>
  </form>
</div>
    <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-semibold text-gray-800">
      <span>Tổng cộng</span>
      <span className="text-orange-600">
        {totalAmount.toLocaleString("vi-VN")}₫
      </span>
    </div>
  </div>
</div>

  );
};

export default CartSummary;
