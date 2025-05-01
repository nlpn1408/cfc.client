"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/features/cartSlice";
import CartInitializer from "@/components/CartInitializer";
import toast from "react-hot-toast";
import { AlertTriangle } from "lucide-react";
import { checkAuth } from "@/utils/checkAuth";
const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.custom(() => (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-md max-w-sm">
          <AlertTriangle className="w-5 h-5 mt-0.5 text-red-500" />
          <div className="text-sm">
            <p className="font-semibold">Giỏ hàng đang trống</p>
            <p className="text-xs text-red-700 mt-0.5">
              Vui lòng thêm sản phẩm để đặt hàng.
            </p>
          </div>
        </div>
      ));
      return;
    }

    const user = await checkAuth();
    if (!user) {
      toast.custom(() => (
        <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg shadow-md max-w-sm">
          <AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-600" />
          <div className="text-sm">
            <p className="font-semibold">Bạn chưa đăng nhập</p>
            <p className="text-xs text-yellow-700 mt-0.5">
              Vui lòng đăng nhập để tiếp tục đặt hàng.
            </p>
          </div>
        </div>
      ));
      return;
    }
    router.push("/checkout");
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-10 min-h-screen">
      <CartInitializer />

      <h1 className="text-2xl md:text-3xl font-bold text-[#723E1E] mb-8 text-center md:text-left">
        Giỏ hàng của bạn
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex-1 max-h-[700px] overflow-y-auto pr-1 md:pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-lg shadow-md">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4072/4072355.png"
                  alt="Empty Cart"
                  className="w-24 h-24 md:w-32 md:h-32 mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Giỏ hàng trống
                </h2>
                <p className="text-gray-500 mb-6 max-w-xs text-sm">
                  Thêm sản phẩm yêu thích vào giỏ và quay lại nhé!
                </p>
                <Link href="/">
                  <button className="inline-flex items-center gap-2 bg-[#723E1E] hover:bg-[#935027] text-white px-5 py-2 rounded-full text-sm">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Tiếp tục mua sắm
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.variant?.id || "default"}`}
                    className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-sm"
                  >
                    <img
                      src={
                        item.product.images?.[0]?.url ||
                        item.images?.[0]?.url ||
                        item.product.images
                      }
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base md:text-lg font-medium text-gray-800">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="text-sm text-[#723E1E] hover:text-[#935027] hover:underline"
                        >
                          Xóa
                        </button>
                      </div>

                      {item.variant?.name && (
                        <p className="text-xs text-gray-500 mt-1">
                          Loại: {item.variant.name}
                        </p>
                      )}

                      <p className="text-xs text-gray-500 mt-1">
                        {item.price.toLocaleString("vi-VN")}₫ x {item.quantity}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity - 1
                            )
                          }
                          className="w-7 h-7 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="text-sm">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.productId,
                              item.quantity + 1
                            )
                          }
                          className="w-7 h-7 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-orange-600 mt-2">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="mt-6">
              <Link href="/">
                <button className="flex items-center gap-2 text-[#723E1E] hover:text-[#935027] hover:underline">
                  <ArrowLeftIcon className="w-4 h-4" />
                  Tiếp tục mua sắm
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white p-5 rounded-2xl shadow-lg border flex flex-col justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Thông tin đơn hàng
          </h2>

          <div className="space-y-4 text-sm text-gray-700 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-2">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.variant?.id || "default"}`}
                className="flex justify-between"
              >
                <div className="w-2/3">
                  <p className="font-medium">{item.product.name}</p>
                  {item.variant?.name && (
                    <p className="text-xs text-gray-500">
                      Loại: {item.variant.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {item.quantity} x {item.price.toLocaleString("vi-VN")}₫
                  </p>
                </div>
                <div className="text-sm font-semibold text-gray-800 text-right">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Số lượng sản phẩm</span>
              <span className="font-medium">{totalQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{totalAmount.toLocaleString("vi-VN")}₫</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Tổng cộng</span>
              <span className="text-orange-600">
                {totalAmount.toLocaleString("vi-VN")}₫
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-4 bg-[#723E1E] hover:bg-[#935027] text-white py-3 rounded-full text-sm font-medium shadow transition"
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
