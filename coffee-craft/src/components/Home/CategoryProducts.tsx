"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Product } from "@/types/product";

type Props = {
  categoryId: string;
};

export default function CategoryProducts({ categoryId }: Props) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`${API_URL}/products?categoryId=${categoryId}`);
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setProducts(result.data);
        } else {
          console.warn("Không có sản phẩm hoặc sai định dạng:", result);
        }
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
    }
  }, [categoryId]);

  return (
    <div className="relative">
      <Carousel className="flex justify-center relative">
        <CarouselContent className="flex items-center space-x-4">
          {loading ? (
            <p className="text-center w-full py-5">Đang tải sản phẩm...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <CarouselItem
                key={product.id}
                className="flex justify-center px-2 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="w-full max-w-xs px-4 border rounded-lg shadow-md border-gray-200 bg-white">
                  <ProductCard className="w-full" product={product} />
                </div>
              </CarouselItem>
            ))
          ) : (
            <p className="text-center w-full py-5">Không có sản phẩm nào.</p>
          )}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
      </Carousel>
    </div>
  );
}
