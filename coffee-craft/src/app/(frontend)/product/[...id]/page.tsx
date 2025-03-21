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
    id: "uuid-16",
    name: "Robusta Coffee",
    description: "This is Robusta Coffee",
    price: 12.5,
    categoryId: "uuid-3",
    brandId: "uuid-15",
    stock: 5,
    active: true,
    avgRating: 4,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    images: [
      {
        id: "uuid-21",
        isThumbnail: false,
        url: "https://taynguyensoul.vn/wp-content/uploads/2021/06/ca-phe-nguyen-chat-signature-taynguyensoul.vn_-600x600.jpg",
      },
      {
        id: "uuid-21",
        isThumbnail: false,
        url: "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/485016554_1044979154117879_2208627813299901002_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=100&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEE6n1JO7NJvBV1Epb38KFi40ggu_EoCaXjSCC78SgJpX9WjWQqGp1etPoOWTW7ArvoBPtV9-cU4B28qcXg_6dV&_nc_ohc=0KNoziDExUUQ7kNvgEwAy-G&_nc_oc=Adnj_uT850XR3e7e9r1OLwBd1FSvaXc6DdyP9MVDxQdSGxYk6KqsbGKyeVrjJCu_wIY&_nc_zt=23&_nc_ht=scontent.fhan4-3.fna&_nc_gid=8l921PhE61XuwsarsZ9ZUw&oh=00_AYE9ludTb-E5oU2Y90UCO6RdmaVDe-UQBpz5fUXoKBPI5w&oe=67E2D791",
      },
      {
        id: "uuid-21",
        isThumbnail: false,
        url: "https://taynguyensoul.vn/wp-content/uploads/2021/06/ca-phe-nguyen-chat-signature-taynguyensoul.vn_-600x600.jpg",
      },
      {
        id: "uuid-21",
        isThumbnail: false,
        url: "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/485016554_1044979154117879_2208627813299901002_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=100&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeEE6n1JO7NJvBV1Epb38KFi40ggu_EoCaXjSCC78SgJpX9WjWQqGp1etPoOWTW7ArvoBPtV9-cU4B28qcXg_6dV&_nc_ohc=0KNoziDExUUQ7kNvgEwAy-G&_nc_oc=Adnj_uT850XR3e7e9r1OLwBd1FSvaXc6DdyP9MVDxQdSGxYk6KqsbGKyeVrjJCu_wIY&_nc_zt=23&_nc_ht=scontent.fhan4-3.fna&_nc_gid=8l921PhE61XuwsarsZ9ZUw&oh=00_AYE9ludTb-E5oU2Y90UCO6RdmaVDe-UQBpz5fUXoKBPI5w&oe=67E2D791",
      },
    ],
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
