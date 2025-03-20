"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import Reviews from "../../../components/Product-detail/comment";
import ProductCard from "../../../components/ProductCard";
import NewsLetter from "../../../components/Home/NewsLetter";
import ProductDetail from "../../../components/Product-detail/Productdetail";
const Detailpage: React.FC = () => {
  const data = [
    {
      title: "Product 1",
      image1: "/product/product4.png",
      image2: "/product/product2.png",
      price: 100,
      link: "/product/1",
      rating: "5.0",
    },
    {
      title: "Product 1",
      image1: "/product/product4.png",
      image2: "/product/product2.png",
      price: 100,
      link: "/product/1",
      rating: "5.0",
    },
    {
      title: "Product 1",
      image1: "/product/product4.png",
      image2: "/product/product2.png",
      price: 100,
      link: "/product/1",
      rating: "5.0",
    },
    {
      title: "Product 1",
      image1: "/product/product4.png",
      image2: "/product/product2.png",
      price: 100,
      link: "/product/1",
      rating: "5.0",
    },
    {
      title: "Product 1",
      image1: "/product/product4.png",
      image2: "/product/product2.png",
      price: 100,
      link: "/product/1",
      rating: "5.0",
    },
    {
      title: "Product 1",
      image1: "/product/product4.png",
      image2: "/product/product2.png",
      price: 100,
      link: "/product/1",
      rating: "5.0",
    },
    {
      title: "Product 1",
      image1: "/product/product4.png",
      image2: "/product/product2.png",
      price: 100,
      link: "/product/1",
      rating: "5.0",
    },
    {
      title: "Product 1",
      image1: "/product/product4.png",
      image2: "/product/product2.png",
      price: 100,
      link: "/product/1",
      rating: "5.0",
    },
  ];
  return (
    <div className="container mx-auto p-6 flex flex-col gap-8">
      <ProductDetail />
      <Reviews />
      <div>
        <h1 className=" text-3xl font-extrabold  pb-10">Sản phẩm liên quan</h1>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
          {data.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default Detailpage;
