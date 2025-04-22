import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCardProps } from "@/types/nav";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
export default function Productdetail({ product }: { product: Product }) {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const commentsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const reviews = product.reviews || [];
  const pageCount = Math.ceil(reviews.length / commentsPerPage);
  const avgRating = product.avgRating || 0;
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
      ), // Chuyển discountPrice thành string và sau đó parse thành số
      discountPrice: String(
        selectedVariant?.discountPrice ?? product.discountPrice ?? 0
      ), // Chuyển discountPrice thành string
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
        {/* Hình ảnh chính */}
        <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-sm">
          {product.images.map((image) => (
            <img
              key={image.url}
              src={image.url}
              alt="Slide"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                product.images.indexOf(image) === currentSlide
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
          ))}
          {/* Nút điều hướng */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            ▶
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-3">
          {product.images.map((image) => {
            const index = product.images.indexOf(image);
            return (
              <img
                key={image.url}
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
        {/* Thông tin cơ bản */}
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
            {parseInt(
              String(
                selectedVariant?.discountPrice ?? product.discountPrice ?? 0
              )
            ).toLocaleString()}{" "}
            ₫{" "}
            <span className="line-through text-gray-400 text-base ml-2">
              {parseInt(
                String(selectedVariant?.price ?? product.price ?? 0)
              ).toLocaleString()}{" "}
              ₫
            </span>
          </p>
          <p className="text-gray-500 text-sm">Kho: {product.stock} sản phẩm</p>
        </div>

        {/* Số lượng */}
        <div className="space-y-2">
          <h2 className="font-semibold text-gray-700">Chọn số lượng:</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() =>
                setSelectedQuantity((prev) => Math.max(1, prev - 1))
              }
              className="w-10 h-10 text-lg font-bold bg-gray-200 hover:bg-gray-300 rounded"
            >
              −
            </button>
            <span>{selectedQuantity}</span>
            <button
              onClick={() =>
                setSelectedQuantity((prev) => Math.min(product.stock, prev + 1))
              }
              className="w-10 h-10 text-lg font-bold bg-gray-200 hover:bg-gray-300 rounded"
            >
              +
            </button>
          </div>
        </div>

        {/* Biến thể */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold text-gray-700">Chọn biến thể:</h2>
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
        <div
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: product.longDescription }}
        />
      </div>
      {/* Reviews Section */}
      <div className="mt-10 w-full col-span-2 bg-white p-6">
        <h2 className="text-2xl font-extrabold mb-6 text-gray-800">
          Đánh giá sản phẩm
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-3xl font-bold text-orange-500">
                {avgRating.toFixed(2)}
              </span>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={`${
                    i < avgRating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                />
              ))}
              <span className="text-gray-600 text-sm ">
                {product.reviews.length} đánh giá của khách hàng
              </span>
            </div>

            <div className="space-y-6">
              {product.reviews
                .slice(
                  currentPage * commentsPerPage,
                  (currentPage + 1) * commentsPerPage
                )
                .map((review) => (
                  <div
                    key={review.id}
                    className="p-4 flex gap-4 border-b pb-3 mb-3"
                  >
                    <img
                      src={review.user.imgUrl}
                      alt={review.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800 flex items-center gap-1">
                          {review.user.name}
                        </p>

                        <div className="flex space-x-1 text-yellow-500">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              fill="currentColor"
                              className="text-yellow-500"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 whitespace-pre-line mt-2">
                        {review.comment}
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        {new Date(review.createdAt).toLocaleString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {product.reviews.length > commentsPerPage && (
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center items-center mt-8 space-x-2"
                pageClassName="px-3 py-2 bg-white border rounded-lg text-black"
                previousLinkClassName="px-4 py-2 bg-white border rounded-lg text-black"
                nextLinkClassName="px-4 py-2 bg-white border rounded-lg text-black"
                disabledClassName="opacity-50 cursor-not-allowed"
                activeClassName="px-3 py-2 bg-indigo-600 text-gray-600 rounded-lg"
                forcePage={currentPage}
              />
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center">
            Hiện tại chưa có đánh giá nào.
          </p>
        )}
      </div>
    </div>
  );
}
