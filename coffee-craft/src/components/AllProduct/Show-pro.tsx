"use client";
import React, { useEffect, useState } from "react";
import { Product, Category } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Menu, X } from "lucide-react";
import ReactPaginate from "react-paginate";

export default function ShowPro() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string>(""); // ex: "0-100000"
  const [rating, setRating] = useState<number | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 12;

  // Lấy danh mục
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const result = await response.json();
      if (Array.isArray(result.data)) setCategories(result.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  // Lấy sản phẩm (lọc danh mục)
  const fetchProducts = async (categoryId: string | null) => {
    try {
      const url = new URL(`${API_URL}/products`);
      if (categoryId) url.searchParams.append("categoryId", categoryId);

      const response = await fetch(url.toString());
      const result = await response.json();
      if (Array.isArray(result.data)) return result.data;
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
    return [];
  };

  // Lọc và phân trang
  const filterAndPaginateProducts = (all: Product[]) => {
    let filtered = [...all];
  
    // Lọc theo khoảng giá
    if (priceRange) {
      const [minStr, maxStr] = priceRange.split("-");
      const min = Number(minStr);
      const max = Number(maxStr);
      filtered = filtered.filter(
        (p) => Number(p.price) >= min && Number(p.price) <= max
      );
    }
  
    // Lọc theo đánh giá (avgRating là number)
    if (rating !== null) {
      filtered = filtered.filter((p) => Math.floor(p.avgRating) >= rating);
    }
  
    // Phân trang
    const totalItems = filtered.length;
    const start = currentPage * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);
  
    setProducts(paginated);
    setPageCount(Math.ceil(totalItems / itemsPerPage));
  };  

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAndFilter = async () => {
      const all = await fetchProducts(selectedCategory);
      setAllProducts(all);
    };
    fetchAndFilter();
  }, [selectedCategory]);

  useEffect(() => {
    filterAndPaginateProducts(allProducts);
  }, [allProducts, currentPage, priceRange, rating]);

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
  };

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
      {/* Sidebar bộ lọc */}
      <aside className="bg-white text-black shadow-md rounded-lg p-6">
        <button
          className="flex items-center justify-between w-full p-3 text-left bg-gray-200 rounded-lg lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-semibold">Lọc sản phẩm</span>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${isOpen ? "block" : "hidden"} lg:block mt-4 space-y-4`}>
          {/* Danh mục */}
          <div>
            <h3 className="font-semibold mb-2">Danh mục</h3>
            <button
              className={`block w-full py-2 px-4 text-left rounded-lg ${
                selectedCategory === null
                  ? "bg-[#723E1E] text-white"
                  : "hover:bg-[#935027] hover:text-white"
              }`}
              onClick={() => handleCategoryClick(null)}
            >
              Tất cả
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`block w-full py-2 px-4 text-left rounded-lg ${
                  selectedCategory === category.id
                    ? "bg-[#723E1E] text-white"
                    : "hover:bg-[#935027] hover:text-white"
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Khoảng giá */}
          <div>
            <h3 className="font-semibold mb-2">Khoảng giá</h3>
            {[
              { label: "Tất cả", value: "" },
              { label: "0 - 100K", value: "0-100000" },
              { label: "100K - 300K", value: "100000-300000" },
              { label: "300K - 500K", value: "300000-500000" },
              { label: "Trên 500K", value: "500000-100000000" },
            ].map((option) => (
              <button
                key={option.value}
                className={`block w-full py-2 px-4 text-left rounded-lg ${
                  priceRange === option.value
                    ? "bg-[#723E1E] text-white"
                    : "hover:bg-[#935027] hover:text-white"
                }`}
                onClick={() => {
                  setPriceRange(option.value);
                  setCurrentPage(0);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Đánh giá */}
          <div>
            <h3 className="font-semibold mb-2">Đánh giá</h3>
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                className={`block w-full py-2 px-4 text-left rounded-lg ${
                  rating === star
                    ? "bg-[#723E1E] text-white"
                    : "hover:bg-[#935027] hover:text-white"
                }`}
                onClick={() => {
                  setRating(star);
                  setCurrentPage(0);
                }}
              >
                Từ {star} sao trở lên
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Danh sách sản phẩm */}
      <section className="lg:col-span-3 col-span-full flex flex-col">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                className="shadow-lg border border-slate-200 rounded-md"
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white border rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm phù hợp.</p>
          </div>
        )}

        {/* Phân trang */}
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center mt-8 space-x-2"
          pageClassName="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-100"
          previousLinkClassName="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-100"
          nextLinkClassName="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-100"
          disabledClassName="opacity-50 cursor-not-allowed"
          activeClassName="px-4 py-2 text-white bg-[#723E1E] rounded-md"
          forcePage={currentPage}
        />
      </section>
    </div>
  );
}
