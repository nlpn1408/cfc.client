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
// import Image from "next/image";
// import premium from "@/public/product/premium.webp"; // Change the extension to .jpg
export default function ProductCard({
  rating,
  title,
  image1,
  image2,
  price,
  link,
}: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="group/item rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-white">
        <Link href="/detail" className="block relative">
          {/* Số lượng đã bán */}
          <div
            className="absolute left-[5px] bottom-16 z-2 bg-white text-[#040707] text-[10px] sm:text-[11px] font-bold px-2 py-1 rounded-[4px] shadow-md border-b-2 border-[#a52f21]"
            style={{ boxShadow: "0 5px 15px 0 rgb(51 51 51 / 10%)" }}
          >
            Đã bán 37.6k+
          </div>

          {/* Badge "100% Arabica Cầu Đất" + Premium Label */}
          <span className="flex flex-col absolute top-2 right-2 items-center">
            {/* Badge "100% Arabica Cầu Đất" */}
            <span
              className="flex flex-col z-[2] bg-black text-white px-2 py-1 
                  text-[7px] sm:text-[8px] md:text-[9px] 
                  items-center justify-center 
                  rounded-[8px] 
                  w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px] 
                  leading-tight text-center"
            >
              <span className="text-[8px] sm:text-[4px] md:text-[5px] font-bold">
                100%
              </span>
              Arabica
              <br />
              Cầu Đất
            </span>

            <img
              src="https://taynguyensoul.vn/wp-content/uploads/2022/04/premium-label-300.png"
              alt="Premium"
              className="w-[35px] sm:w-[30px] md:w-[40px] h-auto mt-1"
            />
          </span>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <p className="text-gray-700 font-medium text-sm sm:text-base">
              {rating}
            </p>
            <StarIcon
              size={16}
              fill="yellow"
              className="text-yellow-400 drop-shadow-sm"
            />
          </div>

          {/* Hình ảnh sản phẩm */}
          <div className="w-full h-full box-border">
            <img
              src={image2}
              alt={title}
              className="group-hover/item:hidden w-full h-[120px] sm:h-[140px] md:h-[200px] lg:h-[220px] object-contain rounded-lg transition-all duration-300"
            />
            <img
              src={image1}
              alt={title}
              className="hidden group-hover/item:block w-full h-[120px] sm:h-[140px] md:h-[200px] lg:h-[220px] object-contain rounded-lg transition-all duration-300"
            />
          </div>

          {/* Tên sản phẩm */}
          <div className="mt-4">
            <p className="text-xs sm:text-sm text-gray-500 capitalize">
              {title}
            </p>
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-blue-500 transition-all sm:w-full sm:truncate mt-2">
              {title}
            </h1>
          </div>
        </Link>

        {/* Giá sản phẩm */}
        <div className="mt-4   flex flex-col items-center">
          <h2 className="text-sm sm:text-base font-semibold text-gray-400 line-through opacity-60">
            $ {price}
          </h2>

          <h2 className="text-base sm:text-lg font-semibold text-red-500">
            $ {price}
          </h2>
        </div>
      </div>
    </div>
  );
}
