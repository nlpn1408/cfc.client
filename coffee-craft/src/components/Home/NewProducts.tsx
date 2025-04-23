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

export default function NewProducts() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Hàm kiểm tra sản phẩm có phải mới trong 1 tháng không
  const isNewProduct = (createdAt: string) => {
    const productDate = new Date(createdAt);
    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);
    return productDate >= oneMonthAgo;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const result = await response.json();

        if (Array.isArray(result.data)) {
          // Lọc sản phẩm mới trong vòng 1 tháng gần nhất
          const newProducts = result.data.filter((product: any) =>
            isNewProduct(product.createdAt)
          );

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
    <section className="container lg:px-16 md:px-8 px-4 py-10 relative">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-5">Sản phẩm mới</h2>
        <Link
          href="/product"
          className="flex items-center dark:text-white dark:hover:text-[#683122] text-md text-slate-700 hover:text-[#683122]"
        >
          Xem thêm <ChevronRightIcon size={20} />
        </Link>
      </div>

      {loading ? (
        <p className="text-center w-full py-5">Đang tải sản phẩm...</p>
      ) : products.length > 0 ? (
        <Carousel className="flex justify-center relative">
          <CarouselContent className="flex items-center">
            {products.map((product) => {
              const isNew = isNewProduct(product.createdAt);

              return (
                <CarouselItem
                  key={product.id}
                  className=" flex justify-center md:basis-1/3 lg:basis-1/4"
                >
                  <div className="relative overflow-hidden w-full border-gray-200 flex flex-col h-full">
                    {isNew && (
                      <div className="absolute top-1 -left-9 bg-red-500 text-white text-xs font-bold px-10 py-1 z-30 -rotate-45">
                        Mới
                      </div>
                    )}

                    <ProductCard
                      className="shadow-lg border border-slate-200 rounded-md"
                      product={product}
                    />
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[1px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
          <CarouselNext className="absolute right-[1px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
        </Carousel>
      ) : (
        <p className="text-center w-full py-5">Không có sản phẩm mới.</p>
      )}
    </section>
  );
}
