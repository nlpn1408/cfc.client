"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { applyVoucher, clearVoucher } from "@/redux/features/voucherSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast"; // Import toast từ react-hot-toast
import { AlertTriangle } from "lucide-react";

type Category = { id: string; name: string }; // Khai báo kiểu Category

const CartSummary = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const selectedVoucher = useSelector(
    (state: RootState) => state.voucher.selectedVoucher
  );

  const [code, setCode] = useState("");

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee: number = 0;

  const isVoucherValid =
    selectedVoucher && subtotal >= (selectedVoucher.minimumOrderValue || 0);

  const discount: number = isVoucherValid
    ? selectedVoucher.type === "PERCENT"
      ? (selectedVoucher.discountPercent || 0) * (subtotal / 100)
      : selectedVoucher.discountAmount || 0
    : 0;

  const finalTotal = subtotal - discount + shippingFee;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleApplyVoucher = async () => {
    try {
      const res = await fetch(`${API_URL}/vouchers/code/${code}`);
      if (!res.ok) throw new Error(res.status.toString());

      const data = await res.json();

      const { applicableCategories = [], excludedProducts = [] } = data;

      const hasExcluded = cartItems.some((item) =>
        excludedProducts.some((p: any) => p.id === item.productId)
      );

      if (hasExcluded) {
        return toast.error(
          "Mã giảm giá không áp dụng cho sản phẩm trong giỏ hàng."
        );
      }

      if (applicableCategories.length > 0) {
        const hasApplicable = cartItems.some((item) =>
          item.product.categories?.some((cat: Category) =>
            applicableCategories.some((c: any) => c.id === cat.id)
          )
        );
        if (!hasApplicable) {
          return toast.custom(() => (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg shadow-md max-w-sm">
              <AlertTriangle className="w-5 h-5 mt-0.5 text-red-500" />
              <div className="text-sm">
                <p className="font-semibold">
                  Mã giảm giá không áp dụng cho sản phẩm trong giỏ hàng.
                </p>
              </div>
            </div>
          ));
        }
      }

      dispatch(applyVoucher(data));
      toast.success("Áp dụng mã giảm giá thành công!");
    } catch (err: any) {
      const status = err.message;
      if (status === "404") {
        toast.error("Không tìm thấy mã giảm giá.");
      } else {
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  const handleClearVoucher = () => {
    dispatch(clearVoucher());
    setCode("");
    toast.error("Đã xóa mã giảm giá.");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Thông tin đơn hàng
      </h2>

      {/* Danh sách sản phẩm */}
      <div className="space-y-4 text-sm text-gray-700 mb-4 max-h-64 overflow-y-auto pr-2">
        {cartItems.map((item) => (
          <div
            key={`${item.productId}-${item.variant?.id || "default"}`}
            className="flex justify-between items-start border-b pb-2 last:border-b-0"
          >
            <div className="max-w-[75%]">
              <p className="font-medium text-gray-800">{item.product.name}</p>
              {item.variant?.name && (
                <p className="text-xs text-gray-500">
                  Loại xay: {item.variant.name}
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

      {/* Thông tin tổng cộng */}
      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Tổng số sản phẩm</span>
          <span className="font-medium">{totalQuantity}</span>
        </div>
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString("vi-VN")}₫</span>
        </div>

        {/* Nhập mã giảm giá */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Mã giảm giá
          </label>
          <div className="flex items-center gap-2">
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Nhập mã giảm giá"
            />
            <Button
              onClick={handleApplyVoucher}
              variant="default"
              className="bg-[#723E1E] hover:bg-[#935027]"
            >
              Áp dụng
            </Button>
            {selectedVoucher && (
              <Button variant="destructive" onClick={handleClearVoucher}>
                Xóa
              </Button>
            )}
          </div>
        </div>

        {/* Phần giảm giá và vận chuyển */}
        {isVoucherValid && discount > 0 && (
          <div className="flex justify-between">
            <span>Giảm giá</span>
            <span>-{discount.toLocaleString("vi-VN")}₫</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>
            {shippingFee === 0
              ? "Miễn phí"
              : `${shippingFee.toLocaleString("vi-VN")}₫`}
          </span>
        </div>

        {/* Tổng cộng */}
        <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-semibold text-gray-800">
          <span>Tổng cộng</span>
          <span className="text-orange-600">
            {finalTotal.toLocaleString("vi-VN")}₫
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
