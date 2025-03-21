import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Product } from "@/types/products";
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
      <div className="w-full h-[400px]">
        <div className="relative w-full">
          {/* Carousel wrapper */}
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

          {/* Slider indicators */}
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

          {/* Slider controls */}
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
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold pb-4">{product.name}</h1>
          <p className="text-gray-700 text-lg pb-4">{product.description}</p>
          <div className="flex items-center text-yellow-500 pb-4">
            {[...Array(product.avgRating)].map((_, i) => (
              <Star key={i} size={24} className="text-yellow-500" />
            ))}
          </div>
          <p className="text-red-600 text-2xl font-semibold pb-4">
            Giá: <span className="line-through text-gray-500">15.0 $</span>{" "}
            {product.price} $
          </p>
          <p className="text-gray-700 pb-4">Kho: {product.stock} sản phẩm</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Chọn trọng lượng:</h2>
          <select
            className="border p-2 rounded-md mt-2 w-full"
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(e.target.value)}
          >
            <option value="250g">250g</option>
            <option value="500g">500g</option>
            <option value="1kg">1kg (2 gói 500g)</option>
          </select>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Yêu cầu:</h2>
          <select
            className="border p-2 rounded-md mt-2 w-full"
            value={grindType}
            onChange={(e) => setGrindType(e.target.value)}
          >
            <option value="Xay sẵn">Xay sẵn</option>
            <option value="Nguyên hạt">Nguyên hạt</option>
          </select>
        </div>
        <div className="flex mt-6 gap-4">
          <button className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold">
            Thêm vào giỏ hàng
          </button>
          <button className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 text-lg font-semibold">
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
