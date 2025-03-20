import React from "react";
import Link from "next/link";
import {
  HeartIcon,
  ShoppingBag,
  ShoppingCart,
  Star,
  StarIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { ProductCardProps } from "@/types/nav";
import { cn } from "@/lib/utils";
// import Image from "next/image";
// import premium from "@/public/product/premium.webp"; // Change the extension to .jpg
export default function ProductCard({
  rating,
  title,
  image1,
  image2,
  price,
  link,
  className = "col-span-1",
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${link}`}
      className={cn(
        "group/item bg-white flex flex-col py-2 gap-3 relative",
        className
      )}
    >
      {/* Số lượng đã bán */}
      <div
        className="group-hover/item:hidden absolute left-1 bottom-1/3 z-20 bg-white text-[#040707] text-xs 
              font-bold px-2 py-1 rounded-md shadow-md border-b-2 border-[#a52f21] box-shadow-custom "
      >
        Đã bán 37.6k+
      </div>

      {/* before image product */}
      <div className="group-hover/item:hidden grid grid-cols-2 absolute z-20 items-start top-5 px-2 ">
        <div className="col-span-1 flex items-center ">
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            {rating}
          </p>
          <StarIcon
            size={16}
            fill="yellow"
            className="text-yellow-400 drop-shadow-sm"
          />
        </div>
        <div className="col-span-1 relative ">
          {/* Badge + Label */}
          <div className=" grid grid-cols-2 grid-rows-2 items-start">
            {/* Badge "100% Arabica Cầu Đất" */}
            <p className="col-start-2 row-start-1 flex flex-col z-20 bg-black text-white py-2 text-center text-xs rounded-lg leading-tight">
              <span>100%</span>
              Arabica
              <br />
              Cầu Đất
            </p>
            <img
              className="col-start-2 row-start-2"
              alt="Premium"
              src="https://taynguyensoul.vn/wp-content/uploads/2022/04/premium-label-300.png"
            />
          </div>
        </div>
        {/* Rating */}
      </div>

      {/* Hình ảnh sản phẩm */}
      <div className="w-full h-full box-border py-5">
        <img
          src={image2}
          alt={title}
          className="group-hover/item:hidden w-full object-contain rounded-lg transition-all duration-300"
        />
        <img
          src={image1}
          alt={title}
          className="hidden group-hover/item:block w-full object-contain rounded-lg transition-all duration-300"
        />
      </div>

      {/* Tên sản phẩm */}
      <div className="px-2">
        <p className="text-xs sm:text-sm text-gray-500 capitalize">{title}</p>
        <h1 className="text-base sm:text-lg font-semibold text-gray-900 transition-all">
          {title}
        </h1>
      </div>

      {/* Giá sản phẩm */}
      <h2 className=" px-2 text-base sm:text-xl font-semibold text-red-500">
        $ {price} -
        <span className="text-sm font-semibold text-gray-400 line-through opacity-60">
          $ {price}
        </span>
      </h2>
    </Link>
  );
}
