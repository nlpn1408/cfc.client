"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Menu, X } from "lucide-react";
import ReactPaginate from "react-paginate";
import NewsLetter from "../../../components/Home/NewsLetter";
import { Product } from "../../../types/product";
import { ProductImage } from "../../../types/product";

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 12;
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://coffee-craft-service.onrender.com/products"
      );
      const result = await response.json();

      console.log("API response:", result);

      if (Array.isArray(result.data)) {
        setProducts(result.data);
        setPageCount(Math.ceil(result.total / itemsPerPage));
      } else {
        console.error("Unexpected API response format", result);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (currentPage >= pageCount) {
      setCurrentPage(0);
    }
  }, [pageCount]);

  const displayedProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
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
        <select
          name="orderby"
          className="orderby bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 transition-all duration-300"
          aria-label="Đơn hàng của cửa hàng"
        >
          <option selected>Thứ tự mặc định</option>
          <option>Thứ tự theo mức độ phổ biến</option>
          <option>Thứ tự theo điểm đánh giá</option>
          <option>Mới nhất</option>
          <option>Thứ tự theo giá: thấp đến cao</option>
          <option>Thứ tự theo giá: cao xuống thấp</option>
        </select>
      </div>

      <div className="flex flex-wrap   gap-3 md:gap-5 p-4">
        {["Arabica", "Robusta", "Culi", "Moka"].map((label, index) => (
          <button
            key={index}
            className="px-4 py-2 rounded-lg bg-gray-'100,000' text-black font-medium shadow-md transition-all hover:bg-gray-600 hover:text-white active:scale-95"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-1/4 bg-white text-black shadow-md rounded-lg p-6">
          {/* Nút mở menu trên mobile */}
          <button
            className="lg:hidden flex items-center space-x-2 p-3 bg-gray-200 rounded-lg w-full text-left"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="text-lg font-semibold">Danh mục</span>
          </button>

          {/* Danh sách danh mục */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } lg:block mt-4 transition-all duration-300`}
          >
            {["Tất cả", "Cafe", "Máy pha Cafe", "Dụng cụ pha Cafe"].map(
              (item, idx) => (
                <button
                  key={idx}
                  className="block w-full text-left py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-600 hover:text-white bg-gray-'100,000' lg:bg-transparent"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </aside>
        <section className="w-full">
          <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-6 ">
            {displayedProducts
              .filter((product) => product && product.id)
              .map((product) => (
                <ProductCard
                  className="shadow-lg border border-slate-200 rounded-md"
                  key={product.id}
                  product={product}
                />
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
            pageClassName="px-3 py-2 bg-white border rounded-lg text-black"
            previousLinkClassName="px-4 py-2 bg-white border rounded-lg text-black"
            nextLinkClassName="px-4 py-2 bg-white border rounded-lg text-black"
            disabledClassName="opacity-50 cursor-not-allowed"
            activeClassName="px-3 py-2 bg-indigo-600 text-gray-500 rounded-lg"
            forcePage={currentPage}
          />
        </section>
      </div>
      <NewsLetter />
    </section>
  );
};

export default AllProducts;
