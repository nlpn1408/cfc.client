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
import { Card, CardContent } from "./ui/card";
import { Product } from "@/types/product";

export default function ListProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://coffee-craft-service.onrender.com/products"
        );
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
    <section className="container max-w-screen-2xl py-10">
      <Carousel>
        <CarouselContent>
          {products.length > 0 ? (
            products.map((product, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 basis-1/2 lg:basis-1/4"
              >
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center">
                    <ProductCard
                      className="shadow-lg border border-slate-200 rounded-md"
                      key={product.id}
                      product={product}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))
          ) : (
            <p className="text-center w-full py-5">Đang tải sản phẩm...</p>
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
