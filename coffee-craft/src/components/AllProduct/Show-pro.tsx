import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ProductImage } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Menu, X } from "lucide-react";
import ReactPaginate from "react-paginate";
export default function ShowPro() {
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

      if (Array.isArray(result.data)) {
        setProducts(result.data);
        setPageCount(Math.ceil(result.total / itemsPerPage));
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
        {displayedProducts.length > 0 ? (
          <div className="grid lg:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-6">
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
        ) : (
          <p className="text-center py-5 text-gray-500">Đang tải sản phẩm...</p>
        )}

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
