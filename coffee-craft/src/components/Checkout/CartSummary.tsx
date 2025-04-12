"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { applyVoucher, clearVoucher } from "@/redux/features/voucherSlice";
import axios from "axios";

const CartSummary = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const selectedVoucher = useSelector(
    (state: RootState) => state.voucher.selectedVoucher
  );

  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee: number = 0;

  // 👉 Tính toán giảm giá
  const isVoucherValid =
    selectedVoucher &&
    subtotal >= Number(selectedVoucher.minimumOrderValue ?? 0);

  const discount = isVoucherValid
    ? selectedVoucher.type === "PERCENT"
      ? Math.min(
          ((selectedVoucher.discountPercent ?? 0) / 100) * subtotal,
          selectedVoucher.maxDiscount ?? Infinity
        )
      : Number(selectedVoucher.discountAmount ?? 0)
    : 0;

  const finalTotal = subtotal - discount + shippingFee;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleApplyVoucher = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/vouchers/code/${code}`);
      dispatch(applyVoucher(data));
      setError("");
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Không tìm thấy mã giảm giá.");
      } else {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  const handleClearVoucher = () => {
    dispatch(clearVoucher());
    setCode("");
    setError("");
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
                <p className="font-medium text-gray-800 text-sm">
                  {item.product.name}
                </p>
                {item.grindType && (
                  <p className="text-xs text-gray-500">
                    Loại xay: {item.grindType}
                  </p>
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

      {/* Tổng đơn hàng */}
      <div className="space-y-4 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Tổng số sản phẩm</span>
          <span className="font-medium">{totalQuantity}</span>
        </div>
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{subtotal.toLocaleString("vi-VN")}₫</span>
        </div>

        {/* Mã giảm giá */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Mã giảm giá
          </label>
          <div className="flex">
            <input
              type="text"
              className="border rounded-s-sm px-3 py-2 text-sm w-full"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Nhập mã giảm giá"
            />
            <button
              onClick={handleApplyVoucher}
              className="bg-[#723E1E] hover:bg-[#935027] text-white px-4 rounded-e-sm"
            >
              Áp dụng
            </button>
            {selectedVoucher && (
              <button
                onClick={handleClearVoucher}
                className="text-red-500 text-sm"
              >
                Xóa
              </button>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {selectedVoucher && (
            <p className="text-green-600 text-sm mt-1">
              Áp dụng: {selectedVoucher.code}
            </p>
          )}
          {selectedVoucher && !isVoucherValid && (
            <p className="text-yellow-500 text-sm mt-1">
              Đơn hàng phải đạt tối thiểu{" "}
              {Number(selectedVoucher.minimumOrderValue).toLocaleString(
                "vi-VN"
              )}
              ₫ để áp dụng mã.
            </p>
          )}
        </div>

        {/* Giảm giá và phí vận chuyển */}
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
