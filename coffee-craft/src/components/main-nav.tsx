"use client";
// import { Category } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MainNav() {
  // const [categories, setCategories] = useState<Category[]>([]);

  // const fetchCategories = async () => {
  //   try {
  //     const API_URL = process.env.NEXT_PUBLIC_API_URL;
  //     const response = await fetch(`${API_URL}/categories`);
  //     const result = await response.json();
  //     if (Array.isArray(result)) {
  //       setCategories(result);
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi tải danh mục:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  return (
    <div className="hidden md:flex flex-1 justify-start items-center gap-3">
      <Link
        href="/"
        className="hover:text-gray-900 transition text-2xl font-bold"
      >
        Coffee<span className="text-[#E1991D]">Cart</span>
      </Link>
      <nav className="flex items-center justify-between px-4 py-3 text-gray-600 ">
        <div className="flex items-center gap-0 lg:gap-4 overflow-auto">
          <Link href="/" className="hover:text-gray-900 transition text-base overflow-auto">
            Trang chủ
          </Link>
          <Link href="/product" className="hover:text-gray-900 transition text-base overflow-auto">
            Cửa hàng
          </Link>
          <Link href="/contact" className="hover:text-gray-900 transition text-base overflow-auto">
            Liên hệ
          </Link>
          <Link href="/blog" className="hover:text-gray-900 transition text-base overflow-auto">
            Tin tức
          </Link>
        </div>
      </nav>
    </div>
  );
}
