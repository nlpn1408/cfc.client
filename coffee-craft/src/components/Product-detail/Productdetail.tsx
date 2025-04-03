import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCardProps } from "@/types/nav";
import { Button } from "../ui/button";

export default function Productdetail({ product }: { product: Product }) {
  const [selectedWeight, setSelectedWeight] = useState("250g");
  const [grindType, setGrindType] = useState("Xay sẵn");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // Auto chuyển slide mỗi 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500); // 500ms

    return () => clearInterval(interval); // Cleanup khi unmount
  }, [currentSlide]); // Lắng nghe thay đổi của currentSlide
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white shadow-lg rounded-lg p-4 gap-4">
      {/* Image Slider */}
      <div className="w-full max-w-3xl mx-auto">
        {/* Hình ảnh chính */}
        <div className="relative w-full h-[500px] overflow-hidden rounded-lg ">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Slide ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Nút điều hướng */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 opacity-40"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 opacity-40"
          >
            ▶
          </button>
        </div>

        {/* Danh sách ảnh nhỏ */}
        <div className="flex justify-center space-x-3 mt-5">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className={`w-20 h-20 object-cover cursor-pointer rounded-lg border-2 transition-all duration-300 ${
                index === currentSlide
                  ? "border-blue-500 scale-110"
                  : "border-gray-300"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      {/* Product Info */}
      <div className="flex flex-col justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold pb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg pb-4">
            {product.shortDescription}
          </p>

          <div className="flex items-center text-yellow-500 pb-4">
            {[...Array(product.avgRating)].map((_, i) => (
              <Star key={i} size={24} className="text-yellow-500" />
            ))}
            <span className="ml-2 text-gray-700">
              ({product.avgRating} đánh giá)
            </span>
          </div>
          <p className="text-red-600 text-2xl font-semibold pb-4">
            Giá: <span className="line-through text-gray-500">400.000 ₫</span>{" "}
            {parseInt(product.price).toLocaleString()} ₫
          </p>
          <p className="text-gray-700 pb-4">Kho: {product.stock} sản phẩm</p>
        </div>
        {/* Weight Selection */}
        <div>
          <h2 className="text-lg font-semibold">Chọn trọng lượng:</h2>
          <div className="flex gap-4 mt-2">
            {["250g", "500g", "1kg (2 gói 500g)"].map((weight) => (
              <span
                key={weight}
                className="border px-4 py-2 rounded-md cursor-pointer bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md"
              >
                {weight}
              </span>
            ))}
          </div>
        </div>

        {/* Grind Type Selection */}
        <div className="">
          <h2 className="text-lg font-semibold">Yêu cầu:</h2>
          <div className="flex gap-4 mt-2">
            {["Xay sẵn", "Nguyên hạt"].map((type) => (
              <span
                key={type}
                className="border px-4 py-2 rounded-md cursor-pointer bg-gray-100 transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-md"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="col-span-1 bg-[#E1991D] h-auto text-white rounded-lg text-sm lg:text-lg font-semibold transition-all duration-300 hover:bg-[#ffa200] hover:scale-105 hover:shadow-lg">
            Thêm vào giỏ hàng
          </Button>
          <Button className="col-span-1 bg-[#683122] text-white h-auto px-6 py-3 rounded-lg text-sm lg:text-lg font-semibold transition-all duration-300 hover:bg-[#351811] hover:scale-105 hover:shadow-lg">
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  );
}
