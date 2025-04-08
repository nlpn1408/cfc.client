"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react"; // Import icons

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600 ">
      <div className="container lg:px-16 md:px-8 px-4 py-5 border-b border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Thông tin thương hiệu */}
          <div>
            <h1 className="font-extrabold text-orange-900 text-3xl">
              Coffee <span className="text-black">Cart</span>
            </h1>
            <p className="mt-6 text-sm leading-relaxed">
              Coffee Cart chuyên cung cấp cà phê nguyên chất và phụ kiện pha chế
              dành cho những người yêu thích cà phê. Chúng tôi cam kết mang đến
              sản phẩm chất lượng cao, giúp bạn tận hưởng trọn vẹn hương vị
              tuyệt vời của cà phê mỗi ngày.
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">Về chúng tôi</h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/" className="hover:text-orange-600 transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-orange-600 transition"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-orange-600 transition"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-orange-600 transition"
                >
                  Hỗ trợ khách hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-orange-600 transition"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Sản phẩm & Dịch vụ */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">
              Sản phẩm & Dịch vụ
            </h2>
            <ul className="text-sm space-y-2">
              <li>
                <Link
                  href="/products"
                  className="hover:text-orange-600 transition"
                >
                  Cà phê nguyên chất
                </Link>
              </li>
              <li>
                <Link
                  href="/products/accessories"
                  className="hover:text-orange-600 transition"
                >
                  Phụ kiện pha chế
                </Link>
              </li>
              <li>
                <Link
                  href="/products/machines"
                  className="hover:text-orange-600 transition"
                >
                  Máy pha cà phê
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-orange-600 transition"
                >
                  Blog cà phê
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="hover:text-orange-600 transition"
                >
                  Chương trình thành viên
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">
              Liên hệ với chúng tôi
            </h2>
            <div className="text-sm space-y-2">
              <p>
                📞 <span className="font-medium">0909-xxx-xxx</span>
              </p>
              <p>
                📧 <span className="font-medium">support@coffeecart.com</span>
              </p>
              <p>🏠 123 Quang Trung, Gò Vấp, TP.HCM</p>
            </div>

            {/* Icon Mạng Xã Hội */}
            <div className="flex items-center space-x-4 mt-4">
              <Link href="#" className="hover:text-orange-600 transition">
                <Facebook size={24} />
              </Link>
              <Link href="#" className="hover:text-orange-600 transition">
                <Instagram size={24} />
              </Link>
              <Link href="#" className="hover:text-orange-600 transition">
                <Twitter size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm bg-gray-100">
        Copyright 2025 © Coffee Cart. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
