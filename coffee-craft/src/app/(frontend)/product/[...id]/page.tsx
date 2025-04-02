"use client";
import React, { useState, useEffect } from "react";
import NewsLetter from "../../../../components/Home/NewsLetter";
import Reviews from "../../../../components/Product-detail/comment";
import ProductDetail from "../../../../components/Product-detail/Productdetail";
import ListProduct from "../../../../components/ListProduct";
import { useParams } from "next/dist/client/components/navigation";

const Detailpage: React.FC = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();
  const id = params?.id;
  const [productData, setProductData] = useState(null);
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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">
          Đang tải dữ liệu sản phẩm...
        </p>
      </div>
    );
  if (!productData)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-red-500">
          Không tìm thấy sản phẩm.
        </p>
      </div>
    );

  return (
    <section className="container max-w-screen-2xl ">
      <div className="bg-white shadow-lg rounded-2xl ">
        <ProductDetail product={productData} />
      </div>

      <div className="mt-10 bg-gray-100 rounded-2xl shadow-md">
        <Reviews />
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-extrabold text-gray-800 pb-6 text-center">
          Sản phẩm liên quan
        </h2>
        <ListProduct />
      </div>

      <div className="mt-16">
        <NewsLetter />
      </div>
    </section>
  );
};

export default Detailpage;
