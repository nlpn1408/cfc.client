"use client"
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
    <div className="hidden md:flex justify-start items-center gap-6">
      <Link
        href="/"
        className="hover:text-gray-900 transition text-2xl font-bold"
      >
        Coffee<span className="text-[#E1991D]">Cart</span>
      </Link>
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 text-gray-600">
        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-gray-900 transition">
            Trang chủ
          </Link>
          <Link href="/product" className="hover:text-gray-900 transition">
            Cửa hàng
          </Link>
          {/* {categories.map((category) => (
            <Link
              key={category.id}
              href={`/product?categoryId=${category.id}`}
              className="hover:text-gray-900 transition"
            >
              {category.name}
            </Link>
          ))} */}
          <Link href="/contact" className="hover:text-gray-900 transition">
            Liên hệp
          </Link>
        </div>
      </nav>
    </div>
  );
}
