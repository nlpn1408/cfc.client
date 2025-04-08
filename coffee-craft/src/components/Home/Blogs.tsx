"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Blogs() {
  const posts = [
    {
      title: "Cà phê pha máy vs pha phin: Đâu là lựa chọn của bạn?",
      desc: "Khám phá sự khác biệt giữa cà phê pha máy và pha phin, đâu mới là phong cách pha chế phù hợp với bạn?",
      img: "https://tse2.mm.bing.net/th?id=OIP.oje6KJ65WGwu3UM2Ii1vAgHaE7&pid=Api",
      authorLogo: "https://randomuser.me/api/portraits/men/32.jpg",
      authorName: "Nguyễn Minh",
      date: "20 Tháng 3, 2025",
      href: "/blogs/coffee-machine-vs-phin",
    },
    {
      title: "Bí quyết làm Latte Art cho người mới bắt đầu",
      desc: "Hướng dẫn từng bước giúp bạn tạo ra những ly latte đẹp mắt với nghệ thuật vẽ bọt sữa chuyên nghiệp.",
      img: "https://rangcafe.vn/wp-content/uploads/2020/03/Cach-pha-ca-phe-phin-thom-ngon-1536x1023.jpg",
      authorLogo: "https://randomuser.me/api/portraits/women/44.jpg",
      authorName: "Trần Hà",
      date: "18 Tháng 3, 2025",
      href: "/blogs/latte-art-guide",
    },
    {
      title: "Hạt Arabica và Robusta: Bạn hợp với loại nào?",
      desc: "Tìm hiểu sự khác biệt giữa hạt cà phê Arabica và Robusta để chọn loại phù hợp với khẩu vị của bạn.",
      img: "https://elmarspices.com/wp-content/uploads/2022/05/ca-phe-hat-arabica-la-gi-01.jpg",
      authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
      authorName: "Lê Huy",
      date: "15 Tháng 3, 2025",
      href: "/blogs/arabica-vs-robusta",
    },
    {
      title: "Cách bảo quản cà phê đúng chuẩn tại nhà",
      desc: "Lưu trữ cà phê như thế nào để giữ trọn hương vị tươi ngon lâu dài? Xem ngay hướng dẫn chi tiết!",
      img: "https://lofita.vn/public/upload/files/ca-phe-Robusta-3.jpg",
      authorLogo: "https://randomuser.me/api/portraits/women/50.jpg",
      authorName: "Hoàng Yến",
      date: "10 Tháng 3, 2025",
      href: "/blogs/store-coffee-guide",
    },
  ];

  return (
    <section className="container lg:px-16 md:px-8 px-4 ">
      <div className="text-center">
        <h1 className="text-6xl text-gray-800 font-semibold">Tin tuc</h1>
        <p className="mt-3 text-gray-500">
          Những câu chuyện thú vị về cà phê và phong cách sống. Cập nhật mỗi
          tuần!
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((item, index) => (
          <article
            className="max-w-md mx-auto shadow-lg border rounded-md duration-300 hover:shadow-xl transition-all"
            key={index}
          >
            <Link href={item.href}>
              <img
                src={item.img}
                loading="lazy"
                alt={item.title}
                className="w-full h-48 rounded-t-md object-cover"
              />
              <div className="flex items-center mt-2 pt-3 px-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={item.authorLogo}
                    className="w-full h-full object-cover"
                    alt={item.authorName}
                  />
                </div>
                <div className="ml-3">
                  <span className="block text-gray-900 font-medium">
                    {item.authorName}
                  </span>
                  <span className="block text-gray-500 text-sm">
                    {item.date}
                  </span>
                </div>
              </div>
              <div className="pt-3 px-4 pb-4">
                <h3 className="text-xl text-gray-900 font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
