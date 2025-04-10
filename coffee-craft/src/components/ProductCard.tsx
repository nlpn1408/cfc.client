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
        "group/item bg-white flex flex-col gap-3 relative overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      {/* Số lượng đã bán */}
      <div className="group-hover/item:hidden absolute -left-1 bottom-1/3 z-20 bg-white text-[#040707] text-xs font-bold px-2 py-1 rounded-lg shadow-md border-b-2 border-[#a52f21]">
        Đã bán {Math.floor(Math.random() * 10000) + 100}+
      </div>

      {/* Thông tin sản phẩm */}
      <div className="group-hover/item:hidden grid grid-cols-2 absolute top-3 left-2 right-2 z-20">
        <div className="flex items-center gap-1">
          <p className="text-gray-700 font-medium text-sm">
            {product.avgRating.toFixed(1)}
          </p>
          <StarIcon
            size={16}
            fill="yellow"
            className="text-yellow-400 drop-shadow-sm"
          />
        </div>

        {/* Badge nếu là Arabica Cầu Đất */}
        {/* Bạn có thể bật điều kiện này khi cần */}
        <div className="flex justify-end">
          <div className="text-center">
            <p className="bg-black text-white text-[0.6rem] leading-tight rounded-lg px-1 py-2">
              <span>100%</span>
              <br />
              Arabica
              <br />
              Cầu Đất
            </p>
            <img
              alt="Premium"
              src="https://taynguyensoul.vn/wp-content/uploads/2022/04/premium-label-300.png"
              className="w-10 mx-auto mt-1"
            />
          </div>
        </div>
      </div>

      {/* Ảnh sản phẩm */}
      <div className="relative w-full h-60 overflow-hidden rounded-lg">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-300 opacity-100 group-hover/item:opacity-0"
        />
        <img
          src={product.images?.[1]?.url}
          alt={product.name}
          className="w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover/item:opacity-100"
        />
      </div>

      {/* Tên sản phẩm */}
      <div className="px-2">
        <h1 className="text-sm xs:text-lg font-semibold text-gray-900 group-hover/item:text-[#935027]  transition-all line-clamp-2">
          {product.name}
        </h1>
      </div>

      {/* Giá sản phẩm */}
      <h2 className="px-2 text-base sm:text-xl font-semibold  text-center">
        <span className="text-sm text-gray-400 line-through opacity-60 mr-1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(+product.price)}
        </span>
        <span className="text-sm text-gray-700 ">
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
