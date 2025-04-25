import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";
export default function Productdetail({ product }: { product: Product }) {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const totalPrice =
    selectedQuantity *
    parseFloat(
      String(selectedVariant?.discountPrice ?? product.discountPrice ?? 0)
    );
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
    return () => clearInterval(interval);
  }, [currentSlide]); // Lắng nghe thay đổi của currentSlide

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      productId: product.id,
      product: product,
      images: product.images,
      quantity: selectedQuantity,
      price: parseFloat(
        String(selectedVariant?.discountPrice ?? product.discountPrice ?? 0)
      ),
      discountPrice: String(
        selectedVariant?.discountPrice ?? product.discountPrice ?? 0
      ),
      variant: selectedVariant,
    };
    console.log("Thêm vào giỏ hàng:", cartItem);
    toast.success("Thêm vào giỏ hàng thành công ");
    dispatch(addToCart(cartItem));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-white  p-4 gap-4">
      {/* Image Slider */}
      <div className="space-y-6">
        <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-sm">
          {product.images.map((image, index) => (
            <img
              key={`${image.url}-${index}`}
              src={image.url}
              alt="Slide"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                product.images.indexOf(image) === currentSlide
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))}
        </div>
        {/* Thumbnails */}
        <div className="flex justify-center gap-3">
          {product.images.map((image) => {
            const index = product.images.indexOf(image);
            return (
              <img
                key={`${image.url}-${index}`} // đảm bảo key luôn duy nhất
                src={image.url}
                alt="Thumbnail"
                onClick={() => setCurrentSlide(index)}
                className={`w-16 h-16 rounded-lg cursor-pointer object-cover border-2 transition-all duration-300 ${
                  index === currentSlide
                    ? "border-orange-500 scale-110"
                    : "border-gray-300 hover:scale-105"
                }`}
              />
            );
          })}
        </div>
      </div>
      {/* Product Info */}
      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          <div
            className="prose prose-sm sm:prose lg:prose-base text-gray-600 max-w-none"
            dangerouslySetInnerHTML={{ __html: product.shortDescription }}
          />
          <div className="flex items-center gap-2 text-yellow-500">
            {[...Array(product.avgRating)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
            <span className="text-sm text-gray-700">
              ({product.reviews.length} đánh giá)
            </span>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {(
              selectedQuantity *
              parseFloat(
                String(
                  selectedVariant?.discountPrice ?? product.discountPrice ?? 0
                )
              )
            ).toLocaleString()}{" "}
            ₫
            {(selectedVariant?.price ?? product.price) &&
              selectedVariant?.discountPrice !== selectedVariant?.price && (
                <span className="line-through text-gray-400 text-base ml-2">
                  {(
                    selectedQuantity *
                    parseFloat(
                      String(selectedVariant?.price ?? product.price ?? 0)
                    )
                  ).toLocaleString()}{" "}
                  ₫
                </span>
              )}
          </p>
          <p className="text-gray-500 text-sm">
            Kho: {selectedVariant?.stock ?? product.stock ?? 0} sản phẩm
          </p>
        </div>
        {/* Số lượng */}
        <div className="space-y-2 flex items-center gap-2">
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="font-semibold text-gray-700">
              Chọn số lượng:
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={product.stock}
              value={selectedQuantity}
              onChange={(e) => {
                const value = Math.max(
                  1,
                  Math.min(product.stock, Number(e.target.value))
                );
                setSelectedQuantity(value);
              }}
              className="w-16 text-center border rounded h-10"
              title="Số lượng sản phẩm"
              placeholder="1"
            />
          </div>
        </div>

        {/* Biến thể */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Chọn loại sản phẩm:</h2>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  type="button"
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 font-medium border text-sm shadow-sm hover:bg-[#935027]
                    ${
                      selectedVariant?.id === variant.id
                        ? "bg-orange-600 text-white scale-105 shadow-md"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Nút thêm vào giỏ */}
        <div>
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#723E1E] hover:bg-[#935027] h-auto py-3 text-white rounded-lg text-lg font-semibold transition-transform duration-300 hover:scale-105 shadow-md"
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
      <div className="col-span-2 w-full bg-white p-8 mt-12 border-t border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-2xl font-extrabold mb-4 text-gray-800">
          Mô tả sản phẩm
        </h2>

        <div className="relative">
          <div
            className={`prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-800 transition-all duration-300 ${
              showFullDescription ? "" : "max-h-[200px] overflow-hidden"
            }`}
            dangerouslySetInnerHTML={{ __html: product.longDescription }}
          />
          {/* Hiệu ứng mờ khi thu gọn */}
          {!showFullDescription && (
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="text-sm font-medium text-[#723E1E] hover:underline"
          >
            {showFullDescription ? "Thu gọn ▲" : "Xem thêm ▼"}
          </button>
        </div>
      </div>
    </div>
  );

}