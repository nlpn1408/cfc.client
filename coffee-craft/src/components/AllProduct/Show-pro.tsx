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
    <div className="grid grid-cols-4 gap-6">
      {/* Sidebar danh mục */}
      <aside className=" bg-white text-black shadow-md rounded-lg p-6">
        <button
          className="lg:hidden flex items-center space-x-2 p-3 bg-gray-200 rounded-lg w-full text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
          <span className="text-lg font-semibold">Danh mục</span>
        </button>

        <div className={`${isOpen ? "block" : "hidden"} lg:block mt-4`}>
          <button
            className={`block w-full text-left py-2 px-4 rounded-lg transition duration-300 ${
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
              className={`block w-full text-left py-2 px-4 rounded-lg transition duration-300 ${
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
      <section className="lg:col-span-3 ">
        {products.length > 0 ? (
          <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-6">
            {products
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              )
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        ) : (
          <p className="text-center py-5 text-gray-500">
            Không có sản phẩm nào.
          </p>
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
  );
}
