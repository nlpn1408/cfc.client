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
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export default function CategoryProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const result = await response.json();

        if (Array.isArray(result.data)) {
          // Lọc sản phẩm theo categoryId
          const filteredProducts = result.data.filter(
            (product: any) =>
              product.categoryId === "21c7cb62-4a79-4cf7-9273-b44f3d499a54"
          );

          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, []);

  return (
    <div className="relative">
      <Carousel className="flex justify-center relative">
        {/* Danh sách sản phẩm */}
        <CarouselContent className="flex items-center space-x-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center px-2 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="w-full max-w-xs px-4 border rounded-lg shadow-md border-gray-200 bg-white">
                  <ProductCard
                    className="w-full"
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
