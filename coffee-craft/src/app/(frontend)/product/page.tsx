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
      <section className="container min-h-screen lg:px-16 md:px-8 px-4 py-10">
        <ProductFilter />
        <ShowPro />
        <NewsLetter />
      </section>
    </>
  );
};

export default AllProducts;
