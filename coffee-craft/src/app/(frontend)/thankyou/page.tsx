"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 100); // để tạo hiệu ứng fade-in
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center min-h-screen transition-opacity duration-700 ${show ? "opacity-100" : "opacity-0"}`}>
      {/* 🎉 Animated success image */}
      <img
        src="/success.gif" // 👉 bạn có thể đổi thành ảnh động khác nếu muốn
        alt="Success"
        className="w-32 h-32 mb-6"
      />

      <h1 className="text-3xl font-bold text-green-600">Đặt hàng thành công!</h1>
      <p className="mt-4 text-gray-700">
        Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 bg-[#723E1E] hover:bg-[#935027] text-white rounded-full text-sm font-medium transition duration-200 shadow"
      >
        🛍️ Tiếp tục mua sắm
      </Link>
    </div>
  );
}
