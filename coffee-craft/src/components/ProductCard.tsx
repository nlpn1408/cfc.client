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
        <Link href={`/product/${link}`} className="block">
          <div className="flex items-center mb-2">
            <p className="mr-2 text-gray-700 font-medium">{rating}</p>
            <StarIcon
              size={16}
              fill="yellow"
              className="text-yellow-400 drop-shadow-sm"
            />
          </div>
          <div className="w-full h-full box-border">
            <img
              src={image2}
              alt={title}
              className="group-hover/item:hidden w-full h-[140px] md:h-[200px] lg:h-[220px] object-contain rounded-lg transition-all duration-300"
            />
            <img
              src={image1}
              alt={title}
              className="hidden group-hover/item:block w-full h-[140px] md:h-[200px] lg:h-[220px] object-contain rounded-lg transition-all duration-300"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500 capitalize">{title}</p>
            <h1 className="text-lg font-semibold text-gray-900 hover:text-blue-500 transition-all sm:w-full sm:truncate mt-2">
              {title}
            </h1>
          </div>
        </Link>
        <div className="grid grid-cols-2 items-center mt-4">
          <h2 className="text-lg font-semibold text-red-500">$ {price}</h2>
          <Button className="bg-indigo-600 text-white border border-indigo-600 rounded-full py-1 px-4 text-sm font-medium transition-all duration-300 hover:bg-indigo-700">
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
}
