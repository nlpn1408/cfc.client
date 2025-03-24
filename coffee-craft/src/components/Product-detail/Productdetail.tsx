import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCardProps } from "@/types/nav";

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
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-lg">
      {/* Image Slider */}
      <div className="w-full h-[400px]">
        <div className="relative w-full">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-700/50 text-white rounded-full"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-700/50 text-white rounded-full"
          >
            ▶
          </button>
        </div>
      </div>
      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold pb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg pb-4">{product.description}</p>

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
        <div className="mt-4">
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
        <div className="flex mt-6 gap-4">
          <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-green-700 hover:scale-105 hover:shadow-lg">
            Thêm vào giỏ hàng
          </button>
          <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:scale-105 hover:shadow-lg">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
