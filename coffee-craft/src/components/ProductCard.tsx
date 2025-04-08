import React from "react";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = "col-span-1",
}) => {
  if (!product || !product.id) {
    return null;
  }
  return (
    <Link
      href={`/product/${product.id}`}
      className={cn(
        "group/item bg-white flex flex-col gap-3 relative overflow-hidden",
        className
      )}
    >
      {/* Số lượng đã bán */}
      <div className="group-hover/item:hidden absolute -left-1 bottom-1/3 z-20 bg-white text-[#040707] text-xs font-bold px-2 py-1 rounded-lg shadow-md border-b-2 border-[#a52f21] box-shadow-custom ">
        Đã bán {Math.floor(Math.random() * 10000) + 100}+
      </div>

      {/* Thông tin sản phẩm */}
      <div className="group-hover/item:hidden grid grid-cols-2 absolute z-20 items-start top-3">
        <div className="col-span-1 flex items-center">
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            {product.avgRating.toFixed(1)}
          </p>
          <StarIcon
            size={16}
            fill="yellow"
            className="text-yellow-400 drop-shadow-sm"
          />
        </div>
        {/* {product.categoryId &&
          product.categoryId === "4f8f6162-564a-4565-a743-bac08f1e0451" && ( */}
        <div className="col-span-1 relative ">
          {/* Badge + Label */}
          <div className=" grid grid-cols-2 items-start">
            {/* Badge "100% Arabica Cầu Đất" */}
            <div className="col-start-2 flex flex-col z-20 ">
              <p className="bg-black text-white py-2 text-center text-[0.6rem] rounded-lg leading-tight">
                <span>100%</span>
                <br />
                Arabica
                <br />
                Cầu Đất
              </p>
              <img
                alt="Premium"
                src="https://taynguyensoul.vn/wp-content/uploads/2022/04/premium-label-300.png"
              />
            </div>
          </div>
        </div>
        {/* )} */}
      </div>

      <div className="w-full h-60 relative overflow-hidden rounded-lg">
        {/* Ảnh chính */}
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg transition-opacity duration-300 ease-in-out opacity-100 group-hover/item:opacity-0 absolute top-0 left-0"
        />

        {/* Ảnh khi hover */}
        <img
          src={product.images?.[1]?.url}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg transition-opacity duration-300 ease-in-out opacity-0 group-hover/item:opacity-100"
        />
      </div>

      {/* Tên sản phẩm */}
      <div className="px-2">
        <h1 className="text-sm xs:text-lg font-semibold text-gray-900 transition-all group-hover/item:text-red-500 line-clamp-2">
          {product.name}
        </h1>
      </div>

      {/* Giá sản phẩm */}
      <h2 className="px-2 text-base sm:text-xl font-semibold text-red-500 text-center transition-colors duration-300">
        <span className="text-sm font-semibold text-gray-400 line-through opacity-60">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(+product.price)}
        </span>
        <span className="text-base">
          -{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(+product.discountPrice)}
        </span>
      </h2>
    </Link>
  );
};
export default ProductCard;
