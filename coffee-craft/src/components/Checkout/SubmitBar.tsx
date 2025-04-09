// components/Checkout/SubmitBar.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  address: any;
  paymentMethod: string;
  cartItems: any[];
  user: {
    name: string;
    phone: string;
    email: string;
  };
};

const SubmitBar = ({ address, paymentMethod, cartItems, user }: Props) => {
  const router = useRouter();

  const handleSubmit = async () => {
    if (!address.street || !address.province || !cartItems.length) {
      alert("Vui lòng điền đầy đủ địa chỉ và kiểm tra giỏ hàng!");
      return;
    }

    const order = {
      user,
      address,
      paymentMethod,
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      createdAt: new Date().toISOString(),
    };

    // Gửi dữ liệu đến backend (ví dụ)
    console.log("Đơn hàng cần gửi:", order);

    // Chuyển trang cảm ơn
    router.push("/thank-you");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <button
        onClick={handleSubmit}
        className="w-full bg-[#723E1E] hover:bg-[#935027] text-white py-3 rounded-full text-sm font-medium transition duration-200 shadow"
      >
        Xác nhận đặt hàng
      </button>
    </div>
  );
};

export default SubmitBar;
