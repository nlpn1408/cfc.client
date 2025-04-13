// components/Checkout/SubmitBar.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

type Props = {
  address: any;
  paymentMethod: string;
  cartItems: any[];
  user: {
    name: string;
    phone: string;
    email: string;
    id: string;
  };
};

const SubmitBar = ({ address, paymentMethod, cartItems, user }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch(); // ✅ Thêm dòng này
  const voucher = useSelector(
    (state: RootState) => state.voucher.selectedVoucher
  );

  const shippingFee = 0;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = voucher
    ? voucher.type === "PERCENT"
      ? Math.min(
          ((voucher.discountPercent ?? 0) / 100) * subtotal,
          voucher.maxDiscount ?? Infinity
        )
      : Number(voucher.discountAmount ?? 0)
    : 0;

  const finalTotal = subtotal - discount + shippingFee;

  const handleSubmit = async () => {
    if (!address.street || !address.province || !cartItems.length) {
      alert("Vui lòng điền đầy đủ địa chỉ và kiểm tra giỏ hàng!");
      return;
    }

    try {
      const API = process.env.NEXT_PUBLIC_API_URL;

      // 🔹 1. Gửi địa chỉ giao hàng
      const shippingAddressPayload = {
        address: `${address.street}, ${address.ward}, ${address.district}, ${address.province}`,
        receiverName: user.name,
        receiverPhone: user.phone,
      };

      const addressRes = await fetch(`${API}/shipping-addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(shippingAddressPayload),
      });

      if (!addressRes.ok) throw new Error("Không thể tạo địa chỉ giao hàng");
      const createdAddress = await addressRes.json();
      const shippingAddressId = createdAddress.id;

      // 🔹 2. Gửi đơn hàng
      const orderPayload = {
        shippingAddressId,
        shippingFee: Number(shippingFee),
        total: Number(subtotal),
        discountAmount: Number(discount),
        finalTotal: Number(finalTotal),
        note: address.note,
        paymentMethod: paymentMethod === "cod" ? "COD" : "VNPAY",
        voucherCode: voucher?.code || undefined,
        orderItems: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          productVariantId: null,
          image: item.images?.[0]?.url, // hoặc imageUrl tùy vào cấu trúc ProductImage
        })),
      };

      const orderRes = await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderPayload),
      });

      const result = await orderRes.json();

      if (!orderRes.ok) {
        console.error("❌ Order response error: ", result);
        throw new Error(result.message || "Đặt hàng thất bại");
      }

      dispatch(clearCart()); // Redux
      localStorage.removeItem("cart"); // Nếu có dùng localStorage
      toast.success("Đặt hàng thành công!");
      router.push("/thankyou");
    } catch (err: any) {
      toast.error("Đã xảy ra lỗi khi đặt hàng: " + err.message);
    }
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="w-full bg-[#723E1E] hover:bg-[#935027] text-white py-3 rounded-[8px] text-sm font-medium transition duration-200 shadow"
      >
        Xác nhận đặt hàng
      </button>
    </div>
  );
};

export default SubmitBar;
