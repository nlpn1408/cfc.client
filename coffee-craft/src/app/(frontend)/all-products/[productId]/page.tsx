"use client";
import React, { useState } from "react";
import Link from "next/link";

const ProductDetail = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Dữ liệu sản phẩm mẫu
  const product = {
    title: "Product 1",
    image1: "/product/product4.png",
    image2: "/product/product2.png",
    price: 100,
    link: "/product/1",
    rating: "5.0",
  };

  // Dữ liệu sản phẩm liên quan mẫu
  const relatedProducts = [
    {
      _id: "2",
      name: "Áo Polo Cao Cấp",
      price: 349000,
      quantity: 30,
      img: "product2.jpg",
    },
    {
      _id: "3",
      name: "Áo Hoodie Dáng Rộng",
      price: 499000,
      quantity: 20,
      img: "product3.jpg",
    },
  ];

  return (
    <div className="bg-white">
      <div className="text-black flex flex-col container mx-auto">
        <div className="flex">
          <img
            src={`http://localhost:3000/images/${product.image1}`}
            alt={product.title}
            className="w-[700px]"
          />

          <div className="flex flex-col gap-[30px] pt-[100px] px-[50px]">
            <h1 className="text-[36px] font-bold pb-[20px]">{product.title}</h1>
            {/* <p className="text-[20px] text-gray-700">{product.description}</p> */}
            <p className="text-[24px] font-semibold text-red-500">
              {product.price.toLocaleString()} đ
            </p>

            <div className="flex gap-[10px]">
              <span>Số lượng:</span>
              {/* <input
                type="number"
                min="1"
                max={product.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded px-2 w-[60px]"
              /> */}
            </div>

            <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <h2 className="text-[28px] font-bold pb-5">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-2 gap-5">
          {relatedProducts.map((item) => (
            <div key={item._id} className="border rounded-lg p-4 text-center">
              <img
                src={`http://localhost:3000/images/${item.img}`}
                alt={item.name}
                className="w-full h-[200px] object-cover mb-3"
              />
              <h3 className="text-[20px] font-semibold">{item.name}</h3>
              <p className="text-red-500 font-semibold">
                {item.price.toLocaleString()} đ
              </p>
              <Link href={`/product/${item._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-3 hover:bg-blue-600 transition">
                  Xem chi tiết
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
