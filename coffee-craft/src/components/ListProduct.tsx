import React from "react";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

const data = [
  {
    title: "Product 1",
    image1: "/product/product4.png",
    image2: "/product/product2.png",
    price: "100,000",
    link: "1",
    rating: "5.0",
  },
  {
    title: "Product 1",
    image1: "/product/product4.png",
    image2: "/product/product2.png",
    price: "100,000",
    link: "2",
    rating: "5.0",
  },
  {
    title: "Product 1",
    image1: "/product/product4.png",
    image2: "/product/product2.png",
    price: "100,000",
    link: "3",
    rating: "5.0",
  },
  {
    title: "Product 1",
    image1: "/product/product4.png",
    image2: "/product/product2.png",
    price: "100,000",
    link: "1",
    rating: "5.0",
  },
  {
    title: "Product 1",
    image1: "/product/product4.png",
    image2: "/product/product2.png",
    price: "100,000",
    link: "4",
    rating: "5.0",
  },
  {
    title: "Product 1",
    image1: "/product/product4.png",
    image2: "/product/product2.png",
    price: "100,000",
    link: "5",
    rating: "5.0",
  },
  {
    title: "Product 1",
    image1: "/product/product4.png",
    image2: "/product/product1.png",
    price: "100,000",
    link: "6",
    rating: "5.0",
  },
];

export default function ListProduct() {
  return (
    <section className="container max-w-screen-2xl py-10">
      <Carousel>
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 basis-1/2 lg:basis-1/4 "
            >
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <ProductCard
                    title={item.title}
                    image1={item.image1}
                    image2={item.image2}
                    price={item.price}
                    link={item.link}
                    rating={item.rating}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
