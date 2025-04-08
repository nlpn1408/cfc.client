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
import { ChevronRight } from "lucide-react";

export default function NewProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const result = await response.json();

        if (Array.isArray(result.data)) {
          const now = new Date();
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(now.getDate() - 7); // Lấy sản phẩm trong 7 ngày gần nhất

          // Lọc sản phẩm mới trong vòng 7 ngày
          const newProducts = result.data.filter((product: any) => {
            const productDate = new Date(product.createdAt);
            return productDate >= sevenDaysAgo;
          });

          setProducts(newProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="container max-w-screen-2xl py-10 relative">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-5">Sản phẩm mới</h2>
        <Link
          href="/product"
          className="flex items-center text-lg text-slate-400 hover:text-[#683122]"
        >
          Xem thêm <ChevronRight />
        </Link>
      </div>

      {loading ? (
        <p className="text-center w-full py-5">Đang tải sản phẩm...</p>
      ) : products.length > 0 ? (
        <Carousel className="flex justify-center relative">
          <CarouselContent className="flex items-center">
            {products.map((product) => {
              const productDate = new Date(product.createdAt);
              const now = new Date();
              const sevenDaysAgo = new Date();
              sevenDaysAgo.setDate(now.getDate() - 7);

              // Kiểm tra xem sản phẩm có phải là "Mới" không
              const isNew = productDate >= sevenDaysAgo;

              return (
                <CarouselItem
                  key={product.id}
                  className="flex justify-center px-2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="relative overflow-hidden w-full max-w-xs p-4 border rounded-lg shadow-md border-gray-200 bg-white flex flex-col h-full">
                    {isNew && (
                      <div className="absolute top-2 -left-7    bg-red-500 text-white text-xs font-bold px-10 py-1  z-30 -rotate-45">
                        Mới
                      </div>
                    )}

                    <ProductCard className="w-full flex-1" product={product} />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
          <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
        </Carousel>
      ) : (
        <p className="text-center w-full py-5">Không có sản phẩm mới.</p>
      )}
    </section>
  );
}
