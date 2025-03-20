import { useState } from "react";
import { Star } from "lucide-react";

const ProductDetail = () => {
  const [selectedWeight, setSelectedWeight] = useState("250g");
  const [grindType, setGrindType] = useState("Xay sẵn");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="w-full h-[400px]">
        <img
          src="https://taynguyensoul.vn/wp-content/uploads/2021/06/ca-phe-nguyen-chat-signature-taynguyensoul.vn_-600x600.jpg"
          alt="Cà Phê Nguyên Chất Signature"
          className="rounded-lg w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold pb-10">
          Cà Phê Nguyên Chất Signature
        </h1>
        <div className="text-yellow-500 my-2 text-lg flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} className="text-yellow-500" />
          ))}
          <span className="ml-2">37.7k+ đã bán</span>
        </div>
        <p className="text-red-500 text-xl font-semibold">
          Giá: <span className="line-through text-gray-500">645.000đ</span>{" "}
          460.000đ
        </p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Chọn trọng lượng:</h2>
          <select
            className="border p-2 rounded-md mt-2"
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
            className="border p-2 rounded-md mt-2"
            value={grindType}
            onChange={(e) => setGrindType(e.target.value)}
          >
            <option value="Xay sẵn">Xay sẵn</option>
            <option value="Nguyên hạt">Nguyên hạt</option>
          </select>
        </div>
        <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
          Thêm vào giỏ hàng
        </button>
        <button className="ml-4 mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
