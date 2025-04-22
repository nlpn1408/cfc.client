"use client";
import React, { useState, useEffect } from "react";
import NewsLetter from "../../../../components/Home/NewsLetter";

import ProductDetail from "../../../../components/Product-detail/Productdetail";
import ListProduct from "../../../../components/ListProduct";
import { useParams } from "next/dist/client/components/navigation";
import ProductRelate from "../../../../components/Product-detail/productRelate";
import { Product } from "../../../../types/product";
const Detailpage: React.FC = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();
  const id = params?.id;
  const [productData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProductData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (!productData)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibol">Không tìm thấy sản phẩm.</p>
      </div>
    );

  return (
    <section className="container lg:px-18 md:px-8 px-4">
      <ProductDetail product={productData} />

      <div className="mt-10">
        <h2 className="text-3xl font-extrabold text-gray-800 pb-6 text-center">
          Sản phẩm liên quan
        </h2>
        <ProductRelate productId={productData?.id} />
      </div>

      <div className="mt-16">
        <NewsLetter />
      </div>
    </section>
  );
};

export default Detailpage;
