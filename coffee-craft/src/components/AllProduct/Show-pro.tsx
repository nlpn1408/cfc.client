import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Menu, X } from "lucide-react";
import ReactPaginate from "react-paginate";

interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
}

export default function ShowPro() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const itemsPerPage = 12;

  // Fetch danh mục
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories`);
      const result = await response.json();
      if (Array.isArray(result)) {
        setCategories(result);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  // Fetch sản phẩm theo danh mục
  const fetchProducts = async (categoryId: string | null) => {
    try {
      const url = categoryId
        ? `${API_URL}/products?categoryId=${categoryId}`
        : `${API_URL}/products`;
      const response = await fetch(url);
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setProducts(result.data);
        setPageCount(Math.ceil(result.total / itemsPerPage));
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(0); // Reset trang về 0 khi chọn danh mục mới
  };

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
      {/* Sidebar danh mục */}
      <aside className="bg-white text-black shadow-md rounded-lg p-6">
        <button
          className="flex items-center justify-between w-full p-3 text-left bg-gray-200 rounded-lg lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-semibold">Danh mục</span>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${isOpen ? "block" : "hidden"} lg:block mt-4`}>
          <button
            className={`block w-full py-2 px-4 text-left rounded-lg transition duration-300 ${
              selectedCategory === null
                ? "bg-gray-600 text-white"
                : "hover:bg-gray-600 hover:text-white"
            }`}
            onClick={() => handleCategoryClick(null)}
          >
            Tất cả
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`block w-full py-2 px-4 text-left rounded-lg transition duration-300 ${
                selectedCategory === category.id
                  ? "bg-gray-600 text-white"
                  : "hover:bg-gray-600 hover:text-white"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Danh sách sản phẩm */}
      <section className="lg:col-span-3 flex flex-col ">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-md md:grid-cols-3 lg:grid-cols-4 border-gray-200 ">
            {products
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              )
              .map((product) => (
                <ProductCard
                  className="shadow-lg border border-slate-200 rounded-md"
                  key={product.id}
                  product={product}
                />
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-white border rounded-lg shadow-md">
            <p className="text-gray-500 text-lg">Không có sản phẩm nào.</p>
          </div>
        )}

        {/* Pagination */}
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
          activeClassName="px-4 py-2 text-gray-500 bg-indigo-600 rounded-md"
          forcePage={currentPage}
        />
      </section>
    </div>
  );
}
