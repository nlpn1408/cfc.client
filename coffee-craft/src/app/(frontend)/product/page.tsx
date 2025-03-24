"use client";
import React from "react";
import NewsLetter from "../../../components/Home/NewsLetter";
import Banner from "../../../components/AllProduct/Banner";
import ShowPro from "../../../components/AllProduct/Show-pro";
import ProductFilter from "../../../components/AllProduct/ProductFilter";
import { CardContent } from "../../../components/ui/card";
const AllProducts: React.FC = () => {
  return (
    <section className="container max-w-screen-2xl py-10 grid gap-3 px-4 md:px-8">
      <Banner />
      <ProductFilter />
      <CardContent className="flex  items-center justify-center">
        <ShowPro />
      </CardContent>

      <NewsLetter />
    </section>
  );
};

export default AllProducts;
