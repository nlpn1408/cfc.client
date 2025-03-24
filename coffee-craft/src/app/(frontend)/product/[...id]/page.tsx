"use client";
import React, { useState, useEffect } from "react"; // Đảm bảo import useEffect
import NewsLetter from "../../../../components/Home/NewsLetter";
import Reviews from "../../../../components/Product-detail/comment";
import ProductDetail from "../../../../components/Product-detail/Productdetail";
import ListProduct from "../../../../components/ListProduct";
import { useParams } from "next/dist/client/components/navigation";

const Detailpage: React.FC = () => {
  const params = useParams();
  const id = params?.id; // Lấy id từ URL
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://coffee-craft-service.onrender.com/products/${id}`)
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

  if (loading) return <p>Đang tải dữ liệu sản phẩm...</p>;
  if (!productData) return <p>Không tìm thấy sản phẩm.</p>;

  return (
    <div className="container max-w-screen-2xl py-10 grid gap-3 px-4 md:px-8">
      <ProductDetail product={productData} />
      <Reviews />
      <div>
        <h1 className=" text-3xl font-extrabold  pb-10">Sản phẩm liên quan</h1>
        <ListProduct />
      </div>
      <NewsLetter />
    </div>
  );
};

export default Detailpage;
