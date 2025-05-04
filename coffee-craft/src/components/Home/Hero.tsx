"use client";
import { UploadButton } from "@/utils/uploadthing";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ImageInput from "../FromInput/ImageInput";

export const HeroData = [
  {
    id: 1,
    title: "Cà phê mới về",
    image: "/product/product1.png",
    link: "#1",
    description:
      "Những loại cà phê hảo hạng được chọn lọc từ các vùng trồng cà phê danh tiếng.",
  },
  {
    id: 2,
    title: "Bán chạy nhất",
    image: "/product/product2.png",
    link: "/shop",
    description:
      "Trải nghiệm hương vị cà phê được khách hàng yêu thích nhất trong tháng.",
  },
  {
    id: 3,
    title: "Phụ kiện pha chế",
    image: "/product/product3.png",
    link: "#2",
    description:
      "Từ máy pha đến dụng cụ thủ công, giúp bạn pha chế tách cà phê hoàn hảo.",
  },
];

export default function Hero() {
  return (
    <section className="container lg:px-16 md:px-8 px-4  ">
      <div className="grid grid-cols-12 items-center gap-6 pb-10 pt-3 ">
        {/* Banner chính */}
        <div className="col-span-full lg:col-span-4 flex py-5 px-5 items-end space-y-4 relative bg-[url(/hero/hero1.png)] h-[500px] bg-cover bg-left bg-no-repeat rounded-lg shadow-lg">
          <Link
            href="/product"
            className="flex text-end text-3xl font-bold text-[#412017] hover:text-orange-700 transition-all">
            Mua ngay <ArrowRight size={40} />
          </Link>
        </div>

        {/* Các sản phẩm nổi bật */}
        <div className="col-span-full lg:col-span-8 grid grid-rows-2 grid-cols-4 gap-5">
          {HeroData.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="col-span-full md:col-span-2 grid grid-cols-2
              rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
              <div className="col-span-1 flex flex-col gap-5 justify-around py-2 px-2 xl:px-5">
                <h1 className="xl:text-3xl lg:text-2xl md:text-3xl font-bold text-brown-900">
                  {item.title}
                </h1>
                <p className="text-sm text-gray-600">{item.description}</p>
                <h2 className="flex text-sm text-orange-700">
                    Xem ngay <ArrowRight size={20} />
                </h2>
              </div>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[200px] object-contain col-span-1"
              />
            </Link>
          ))}

          {/* Banner phụ */}
          <Link
            href="/shop"
            className="col-span-full md:col-span-2  hover:scale-105 transition-all duration-300 ease-in-out bg-[url(/hero/hero2.png)] h-[240px] bg-left bg-no-repeat rounded-lg shadow-lg">
            <div className="grid grid-cols-3 gap-5">
              <div className="xl:col-span-2 md:col-span-2 gap-5 flex flex-col justify-around text-white xl:px-5 md:px-2 py-2">
                <h1 className="xl:text-3xl lg:text-2xl md:text-3xl font-bold ">Khám phá hương vị</h1>
                <p className="text-sm ">
                  Những dòng cà phê đậm đà với hương thơm quyến rũ dành cho
                  người yêu cà phê.
                </p>
                <h2 className="flex text-lg font-bold ">
                  Tìm hiểu ngay <ArrowRight size={20} />
                </h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
