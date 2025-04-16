"use client";
import React from "react";
import NewsLetter from "../../../components/Home/NewsLetter";
import Banner from "../../../components/AllProduct/Banner";
import ShowPro from "../../../components/AllProduct/Show-pro";
import ProductFilter from "../../../components/AllProduct/ProductFilter";
import { CardContent } from "../../../components/ui/card";
const AllProducts: React.FC = () => {
  return (
    <>
      <Banner />
      <section className="container py-10 grid gap-3  lg:px-18 md:px-8 px-4">
        <ProductFilter />
        <CardContent className="flex items-center px-4 justify-center">
          <ShowPro />
        </CardContent>
        <NewsLetter />
      </section>
    </>
  );
};

export default AllProducts;
