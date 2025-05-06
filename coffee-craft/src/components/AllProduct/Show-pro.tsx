"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, Category } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Menu, X } from "lucide-react";
import ReactPaginate from "react-paginate";

export const filterPrice = [
  { label: "0 - 100K", value: "0-100000" },
  { label: "100K - 300K", value: "100000-300000" },
  { label: "300K - 500K", value: "300000-500000" },
  { label: "Trên 500K", value: "500000-100000000" },
];

export default function ShowPro() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string>("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 12;

  // Cập nhật URL params
  const updateURLParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page về 1 nếu thay đổi bộ lọc
    if (key !== "page") {
      params.set("page", "1");
    }
    router.push(`?${params.toString()}`);
  };

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

  // Lấy sản phẩm
  const fetchProducts = async () => {
    try {
      let url = new URL(`${API_URL}/products`);

      // Lấy giá trị từ state hiện tại
      if (selectedCategory) {
        url.searchParams.append("categoryId", selectedCategory);
      }

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split("-").map(Number);
        url.searchParams.append("minPrice", minPrice.toString());
        url.searchParams.append("maxPrice", maxPrice.toString());
      }

      url.searchParams.append("page", (currentPage + 1).toString());
      url.searchParams.append("limit", itemsPerPage.toString());

      const response = await fetch(url.toString());
      const result = await response.json();

      if (Array.isArray(result.data)) {
        setProducts(result.data);
        setPageCount(Math.ceil(result.total / itemsPerPage));
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  // Đồng bộ state với URL khi load
  useEffect(() => {
    const categoryId = searchParams.get("categoryId");
    const price = searchParams.get("price");
    const page = parseInt(searchParams.get("page") || "1", 10);

    setSelectedCategory(categoryId);
    setPriceRange(price || "");
    setCurrentPage(page - 1);
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, priceRange, currentPage]);

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0);
    updateURLParams("categoryId", categoryId);
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
    setCurrentPage(0);
    updateURLParams("price", range || null);
  };

  const handlePageClick = (event: any) => {
    const selected = event.selected;
    setCurrentPage(selected);
    updateURLParams("page", (selected + 1).toString());
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

        <div
          className={`${isOpen ? "block" : "hidden"} lg:block mt-4 space-y-4`}
        >
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
            <button
              className={`block w-full py-2 px-4 text-left rounded-lg ${
                priceRange === ""
                  ? "bg-[#723E1E] text-white"
                  : "hover:bg-[#935027] hover:text-white"
              }`}
              onClick={() => handlePriceRangeChange("")}
            >
              Tất cả
            </button>
            {filterPrice.map((option) => (
              <button
                key={option.value}
                className={`block w-full py-2 px-4 text-left rounded-lg ${
                  priceRange === option.value
                    ? "bg-[#723E1E] text-white"
                    : "hover:bg-[#935027] hover:text-white"
                }`}
                onClick={() => handlePriceRangeChange(option.value)}
              >
                {option.label}
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
            <p className="text-gray-500 text-lg">
              Không tìm thấy sản phẩm phù hợp.
            </p>
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
          activeClassName="px-4 py-2 text-gray-400 bg-[#723E1E] rounded-md"
          forcePage={currentPage}
        />
      </section>
    </div>
  );
}
