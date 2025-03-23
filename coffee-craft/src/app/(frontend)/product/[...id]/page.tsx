"use client";
import React, { useState, useEffect } from "react"; // Đảm bảo import useEffect
import { Star } from "lucide-react";
import Link from "next/link";
import ProductCard from "../../../../components/ProductCard";
import NewsLetter from "../../../../components/Home/NewsLetter";
import Reviews from "../../../../components/Product-detail/comment";
import ProductDetail from "../../../../components/Product-detail/Productdetail";
import ListProduct from "../../../../components/ListProduct";
import { useParams } from "next/dist/client/components/navigation";
import { ProductCardProps } from "@/types/nav";

// interface ProductDetailProps {
//   data?: ProductCardProps[]; // Data có thể undefined, gán mặc định là []
// }

const Detailpage: React.FC = () => {
  // const params = useParams();
  // const id = params?.id?.[0]; // Lấy phần tử đầu tiên trong mảng

  // // Đảm bảo id là string
  // console.log("ID từ URL:", id);
  // const [ProductData, setProductData] = useState<ProductCardProps>();

  // useEffect(() => {
  //   console.log("Danh sách sản phẩm:", data);
  //   if (id && data.length > 0) {
  //     const foundProduct = data.find((product) => product.link === id);
  //     setProductData(foundProduct);
  //   }
  // }, [id, data]);

  // console.log(ProductData);

  // if (!ProductData) return <p>Không tìm thấy sản phẩm.</p>;
  const productData = {
    id: "00bb1762-b465-4009-8c7e-8284ee5781ee",
    name: "Cà phê viên nén Perfetto - Intenso (25 viên/hộp) - Tương thích Nespresso",
    description:
      "ca-phe-vien-nen-perfetto-intenso-25-vien-hop-tuong-thich-nespresso",
    price: "334800",
    categoryId: "4f8f6162-564a-4565-a743-bac08f1e0451",
    brandId: "uuid-15",
    stock: 1000,
    active: true,
    avgRating: 0,
    createdAt: "2025-03-22T10:23:42.413Z",
    updatedAt: "2025-03-22T16:17:31.834Z",
    images: [
      {
        id: "d0270ea2-694a-4c8e-8b38-84378802569a",
        productId: "00bb1762-b465-4009-8c7e-8284ee5781ee",
        url: "https://estore-image.perfetto.com.vn/api/v1/files/images/ca-phe-vien-nen-perfetto-intenso-25-vien-hop-tuong-thich-nespresso-0-1702264765971",
        order: 0,
        isThumbnail: true,
        createdAt: "2025-03-22T10:23:42.522Z",
        updatedAt: "2025-03-22T10:23:42.522Z",
      },
    ],
    category: {
      id: "4f8f6162-564a-4565-a743-bac08f1e0451",
      name: "Cà phê",
      description: "ca-phe",
      parentId: null,
      createdAt: "2025-03-22T09:29:39.890Z",
      updatedAt: "2025-03-22T09:29:39.890Z",
    },
    brand: {
      id: "uuid-15",
      name: "Lavazza",
      description: "Lavazza is a coffee company",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z",
    },
  };

  //   {
  //     title: "Product 1",
  //     image1: "/product/product4.png",
  //     image2: "/product/product2.png",
  //     price: "100",
  //     link: "/product/1",
  //     rating: "5.0",
  //   },
  //   {
  //     title: "Product 1",
  //     image1: "/product/product4.png",
  //     image2: "/product/product2.png",
  //     price: "100",
  //     link: "/product/1",
  //     rating: "5.0",
  //   },
  //   {
  //     title: "Product 1",
  //     image1: "/product/product4.png",
  //     image2: "/product/product2.png",
  //     price: "100",
  //     link: "/product/1",
  //     rating: "5.0",
  //   },
  //   {
  //     title: "Product 1",
  //     image1: "/product/product4.png",
  //     image2: "/product/product2.png",
  //     price: "100",
  //     link: "/product/1",
  //     rating: "5.0",
  //   },
  //   {
  //     title: "Product 1",
  //     image1: "/product/product4.png",
  //     image2: "/product/product2.png",
  //     price: "100",
  //     link: "/product/1",
  //     rating: "5.0",
  //   },
  //   {
  //     title: "Product 1",
  //     image1: "/product/product4.png",
  //     image2: "/product/product2.png",
  //     price: "100",
  //     link: "/product/1",
  //     rating: "5.0",
  //   },
  //   {
  //     title: "Product 1",
  //     image1: "/product/product4.png",
  //     image2: "/product/product2.png",
  //     price: "100",
  //     link: "/product/1",
  //     rating: "5.0",
  //   },
  //   {
  //     title: "Product 1",
  //     image1: "/product/product4.png",
  //     image2: "/product/product2.png",
  //     price: "100",
  //     link: "/product/1",
  //     rating: "5.0",
  //   },
  // ];
  return (
    <div className="container mx-auto p-6 flex flex-col gap-8">
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
