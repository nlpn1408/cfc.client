"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice"; // chỉnh path nếu cần
import CartInitializer from "@/components/CartInitializer";
const Cart = () => {
  const dispatch = useDispatch();

  // 👇 Dữ liệu mẫu
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };
  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };
  const handleCheckout = () => {
    console.log("Đặt hàng với:", cartItems);
    // Ví dụ: chuyển sang trang checkout hoặc gọi API lưu đơn hàng
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="px-4 md:px-10 lg:px-20 py-14">
      <CartInitializer />
      <h1 className="text-3xl font-semibold text-gray-800 mb-10">
        Giỏ hàng của bạn
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center text-gray-600 py-20">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4072/4072355.png"
                alt="Empty Cart"
                className="w-40 h-40 mb-6 opacity-80"
              />
              <h2 className="text-2xl font-semibold mb-2">
                Giỏ hàng đang trống
              </h2>
              <p className="text-gray-500 mb-6">
                Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.
              </p>
              <Link href="/">
                <button className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md transition-all duration-200">
                  <ArrowLeftIcon className="w-4 h-4" />
                  Tiếp tục mua sắm
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId}-${item.grindType || "default"}`}
                  className="flex flex-col md:flex-row items-center border p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={
                      item.product.images?.[0]?.url ||
                      item.images?.[0]?.url ||
                      item.product.images
                    }
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="md:ml-6 flex-1 w-full mt-4 md:mt-0">
                    <div className="flex justify-between w-full">
                      <h3 className="text-lg font-medium text-gray-700">
                        {item.product.name}
                      </h3>
                      <button
                        className="text-sm text-[#723E1E] hover:underline hover:text-[#935027]"
                        onClick={() => handleRemoveItem(item.productId)}
                      >
                        Xóa
                      </button>
                    </div>

                    {item.grindType && (
                      <p className="text-sm text-gray-500 mt-1">
                        Loại xay: {item.grindType}
                      </p>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      {item.price.toLocaleString("vi-VN")}₫ x {item.quantity}
                    </p>

                    {/* Điều chỉnh số lượng */}
                    <div className="flex items-center mt-2 gap-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                        className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                        disabled={item.quantity <= 1}
                      >
                        –
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                        className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <p className="text-sm font-semibold text-gray-700 mt-2">
                      Tạm tính:{" "}
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <Link href="/">
              <button className="flex items-center gap-2 mt-8 text-orange-600 hover:underline">
                <ArrowLeftIcon className="w-4 h-4" />
                Tiếp tục mua sắm
              </button>
            </Link>
          )}
        </div>

        {/* Thông tin đơn hàng */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Thông tin đơn hàng
          </h2>
          <div className="flex justify-between mb-3 text-gray-700">
            <span>Tổng số sản phẩm</span>
            <span>{totalQuantity}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-6">
            <span>Tổng tiền</span>
            <span className="font-medium">
              {totalAmount.toLocaleString("vi-VN")}₫
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-[#723E1E] hover:bg-[#935027] text-white py-3 rounded-md text-sm font-medium transition duration-200"
          >
            Tiến hành đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
