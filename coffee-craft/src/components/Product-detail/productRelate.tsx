"use client";

import React, { useEffect, useState } from "react";
import { Product, Category } from "../../types/product";
import ProductCard from "../ProductCard";
import ReactPaginate from "react-paginate";
export interface ProductRelateProps {
  productId: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductRelate({ productId }: ProductRelateProps) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const pageCount = Math.ceil(relatedProducts.length / itemsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, allRes, categoryRes] = await Promise.all([
          fetch(`${API_URL}/products/${productId}`).then((res) => res.json()),
          fetch(`${API_URL}/products`).then((res) => res.json()),
          fetch(`${API_URL}/categories`).then((res) => res.json()),
        ]);
        console.log("categoryRes", categoryRes);

        const currentProduct = productRes;
        const allProducts = allRes.data || [];
        const allCategories: Category[] = categoryRes.data || [];

        if (!currentProduct?.categoryId) {
          setLoading(false);
          return;
        }

        const related = allProducts.filter(
          (item: Product) =>
            item.categoryId === currentProduct.categoryId &&
            item.id !== currentProduct._id
        );

        const categoryInfo = allCategories.find(
          (cat: Category) => cat.id === currentProduct.categoryId
        );

        setRelatedProducts(related);
        setCurrentCategory(categoryInfo || null);
      } catch (err) {
        console.error("Lỗi fetch dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);
  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };
  if (loading) return <div>Đang tải sản phẩm liên quan...</div>;

  return (
    <section className="lg:col-span-3 flex flex-col">
      {relatedProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 p-4  md:grid-cols-3 lg:grid-cols-4 ">
            {relatedProducts
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
            activeClassName="px-4 py-2 text-slate-500 bg-indigo-600 rounded-md"
            forcePage={currentPage}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[300px] w-full bg-white border rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">Không có sản phẩm liên quan.</p>
        </div>
      )}
    </section>
  );
}
