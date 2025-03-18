"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check } from "lucide-react";
import ReactPaginate from "react-paginate";
import NewsLetter from "../../../components/Home/NewsLetter";
const AllProducts: React.FC = () => {
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
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

  useEffect(() => {
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [data.length]);
  useEffect(() => {
    if (currentPage >= pageCount) {
      setCurrentPage(0);
    }
  }, [pageCount]);

  const itemsPerPage = 9;
  const displayedProducts = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event: any) => {
    const selected = event.selected;
    setCurrentPage(selected);
  };

  return (
    <section className="container max-w-screen-2xl py-10 grid gap-3 px-4 md:px-8">
      <div className="w-full h-80 bg-[url(/banner/banner1.png)] bg-no-repeat bg-cover bg-center flex items-center">
        <div className="px-6 md:px-20 lg:px-[182px] py-10 text-white text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Giúp bạn chọn được túi cà phê sạch…
          </h1>
          <p className="mt-3 text-sm md:text-base max-w-xl">
            Trên thị trường có đến 90% là cà phê “đại trà” - sản xuất không tiêu
            chuẩn, hương vị kém...
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center py-5 border-b gap-3">
        <span className="text-sm text-gray-600">
          Trang chủ &gt; Shop &gt; Cà phê nguyên chất
        </span>
        <ToggleGroup.Root type="single" className="flex space-x-2">
          {["new", "price-asc", "price-desc", "rating"].map((filter) => (
            <ToggleGroup.Item
              key={filter}
              value={filter}
              className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium transition-all data-[state=on]:bg-gray-800 data-[state=on]:text-white"
            >
              {filter === "new" && "Mới nhất"}
              {filter === "price-asc" && "Giá tăng dần"}
              {filter === "price-desc" && "Giá giảm dần"}
              {filter === "rating" && "Đánh giá"}
              <Check className="w-4 h-4 transition-opacity opacity-0 data-[state=on]:opacity-100" />
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:gap-5 p-4">
        {["Arabica", "Robusta", "Culi", "Moka"].map((label, index) => (
          <button
            key={index}
            className="px-4 py-2 rounded-lg bg-gray-100 text-black font-medium shadow-md transition-all hover:bg-gray-600 hover:text-white active:scale-95"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-1/4 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Danh mục
          </h2>
          {["Tất cả", "Cafe", "Máy pha Cafe", "Dụng cụ pha Cafe"].map(
            (item, idx) => (
              <button
                key={idx}
                className="block w-full text-left py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-600"
              >
                {item}
              </button>
            )
          )}
        </aside>
        <section className="w-full lg:w-3/4">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-4">
            {displayedProducts.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName="flex justify-center items-center mt-8 space-x-2"
            pageClassName="px-3 py-2 bg-white border rounded-lg"
            previousLinkClassName="px-4 py-2 bg-white border rounded-lg"
            nextLinkClassName="px-4 py-2 bg-white border rounded-lg"
            disabledClassName="opacity-50 cursor-not-allowed"
            activeClassName="px-3 py-2 bg-indigo-600 text-gray-600 rounded-lg"
            forcePage={currentPage}
          />
        </section>
      </div>
      <NewsLetter />
    </section>
  );
};

export default AllProducts;
