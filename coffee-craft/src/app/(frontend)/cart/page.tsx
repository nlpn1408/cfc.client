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
    console.log("Thông tin người dùng:", user);
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
    <div className="container min-h-screen lg:px-16 md:px-8 px-4 py-14">
      <CartInitializer />
      <h1 className="dark:text-[#723E1E] text-3xl font-semibold text-[#723E1E] hover:text-[#935027] mb-10">
        Giỏ hàng của bạn
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex-1 max-h-[700px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4072/4072355.png"
                  alt="Empty Cart"
                  className="w-32 h-32 mb-4 opacity-90"
                />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Giỏ hàng đang trống
                </h2>
                <p className="text-gray-500 mb-6 max-w-xs">
                  Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá các sản
                  phẩm tuyệt vời của chúng tôi!
                </p>
                <Link href="/" className="inline-block">
                  <button className="inline-flex items-center gap-2 bg-[#723E1E] hover:bg-[#935027] text-white px-6 py-2 rounded-full transition-all duration-200 shadow-md">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Tiếp tục mua sắm
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={`${item.productId}-${item.variant?.id || "default"}`}
                    className="flex flex-col md:flex-row items-center border-slate-700 border p-4 rounded-lg shadow-sm"
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
                        <h3 className="dark:text-slate-200 text-lg font-medium text-gray-700">
                          {item.product.name}
                        </h3>
                        <button
                          className="text-sm text-[#723E1E] hover:underline hover:text-[#935027]"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          Xóa
                        </button>
                      </div>

                      {item.variant?.name && (
                        <p className="dark:text-slate-200 text-sm text-gray-500 mt-1">
                          Loại sản phẩm: {item.variant.name}
                        </p>
                      )}

                      <p className="dark:text-slate-200 text-sm text-gray-500 mt-1">
                        {item.price.toLocaleString("vi-VN")}₫ x {item.quantity}
                      </p>

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

                      <p className="dark:text-slate-200 text-sm font-semibold text-gray-700 mt-2">
                        Tạm tính:{" "}
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

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Thông tin đơn hàng
          </h2>
          <div className="pr-2 mb-6 space-y-4 text-sm text-gray-700 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.variant?.id || "default"}`}
                className="flex justify-between items-start border-b pb-2 last:border-b-0 "
              >
                <div className="max-w-[75%]">
                  <p className="font-medium text-gray-800 leading-snug">
                    {item.product.name}
                  </p>
                  {item.variant?.name && (
                    <p className="text-xs text-gray-500">
                      Loại sản phẩm: {item.variant.name}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {item.quantity} x {item.price.toLocaleString("vi-VN")}₫
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm text-gray-700 border-t border-gray-200 pt-4">
            <div className="flex justify-between">
              <span>Tổng số sản phẩm</span>
              <span className="font-medium">{totalQuantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{totalAmount.toLocaleString("vi-VN")}₫</span>
            </div>
            <div className="flex justify-between text-base font-semibold text-gray-800">
              <span>Tổng cộng</span>
              <span className="text-orange-600">
                {totalAmount.toLocaleString("vi-VN")}₫
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#723E1E] hover:bg-[#935027] text-white py-3 rounded-full text-sm font-medium transition duration-200 shadow mt-2"
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
