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
      <div className="group/item">
        <Link href={`/product/${link}`}>
          <div className="flex items-center">
            <p className="mr-3">{rating}</p>
            <StarIcon
              key={Math.random() * 1000}
              size={15}
              fill="yellow"
              className="text-yellow-400"
            />
          </div>
          <div className="w-full h-full box-border ">
            <img
              src={image2}
              alt={title}
              className="group-hover/item:hidden w-full object-contain rounded-lg duration-300 transition-all"
            />
            <img
              src={image1}
              alt={title}
              className="hidden group-hover/item:block w-full object-contain rounded-lg duration-300 transition-all"
            />
          </div>
          <div>
            <p className="pt-5 text-xs capitalize text-slate-600">{title}</p>
            <h1
              className="text-lg cursor-pointer hover:text-blue-500 transition-all hover:underline 
                    sm:w-full sm:truncate mt-2 text-black font-semibold"
            >
              {title}
            </h1>
          </div>
        </Link>
        <div className="grid grid-cols-2 justify-between items-center ">
          <h2 className="col-span-full lg:col-span-1 text-base hover:text-red-400">
            $ {price}
          </h2>
          <Button className="col-span-full lg:col-span-1 hover:none bg-transparent border border-slate-600 rounded-full text-black py-0 text-base font-light">
            {" "}
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
}
