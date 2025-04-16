"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Product } from "@/types/product";

export default function ListProduct() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const result = await response.json();

        if (Array.isArray(result.data)) {
          setProducts(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className=" relative">
      <Carousel className="flex justify-center relative">
        {/* Danh sách sản phẩm */}
        <CarouselContent className="flex items-center">
          {products.length > 0 ? (
            products.map((product, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center px-2 basis-1/2 md:basis-1/4 lg:basis-1/5"
              >
                <div className="w-full max-w-xs px-4 border rounded-lg shadow-md border-gray-200 bg-white">
                  <ProductCard
                    className="w-full "
                    key={product.id}
                    product={product}
                  />
                </div>
              </CarouselItem>
            ))
          ) : (
            <p className="text-center w-full py-5">Đang tải sản phẩm...</p>
          )}
        </CarouselContent>

        {/* Nút điều hướng */}
        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
      </Carousel>
    </div>
  );
}
