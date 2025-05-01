import { Star } from "lucide-react";
import ReactPaginate from "react-paginate";
import { Review } from "@/types/product";
import React from "react";
interface ProductReviewsProps {
  reviews: Review[];
  avgRating: number;
}

export default function ProductReviews({
  reviews,
  avgRating,
}: ProductReviewsProps) {
  const commentsPerPage = 4;
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageCount = Math.ceil(reviews.length / commentsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const getVisibleReviews = () => {
    const start = currentPage * commentsPerPage;
    const end = start + commentsPerPage;
    return reviews.slice(start, end);
  };

  const roundedAvg = Math.round(avgRating);

  return (
    <div className="w-full col-span-2 bg-white p-6">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800">
        Đánh giá sản phẩm
      </h2>

      {reviews.length > 0 ? (
        <>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl font-bold text-orange-500">
              {avgRating ? avgRating.toFixed(2) : "0.00"}
            </span>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className={i < roundedAvg ? "text-yellow-500" : "text-gray-300"}
                fill="currentColor"
              />
            ))}
            <span className="text-gray-600 text-sm ">
              {reviews.length} đánh giá của khách hàng
            </span>
          </div>

          <div className="space-y-6">
            {getVisibleReviews().map((review) => (
              <div
                key={review.id}
                className="p-4 flex gap-4 border-b pb-3 mb-3 flex-wrap sm:flex-nowrap"
              >
                <img
                  src={review.user.imgUrl || undefined} // Kiểm tra imgUrl có hợp lệ không, nếu không thì không hiển thị ảnh
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

          {reviews.length > commentsPerPage && (
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
        <p className="text-gray-500 text-center min-h-10">
          Hiện tại chưa có đánh giá nào.
        </p>
      )}
    </div>
  );
}
