import React, { useState } from "react";
import { Star, ThumbsUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactPaginate from "react-paginate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
const reviews = [
  {
    user: "L****7",
    rating: 5,
    comment:
      "Hương vị: thơm. Đối tượng sử dụng: thích cà phê hạt đều đẹp, pha espresso rất ngon, đậm đà. Sẽ ủng hộ tiếp khi dùng hết.",
    likes: 5,
    date: "02/02/2025",
    verified: true,
  },
  {
    user: "Luongtrungfffff",
    rating: 5,
    comment: "",
    likes: 9,
    date: "04/02/2025",
    verified: true,
  },
  {
    user: "Tamle777",
    rating: 5,
    comment:
      "Hương vị: ngon. Bao bì mẫu mã: Máy nhỏ gọn, cf ngon, không biết có bền không chứ trước mắt khá ok.",
    likes: 8,
    date: "05/02/2025",
    verified: true,
  },
  {
    user: "HoangMinh",
    rating: 4,
    comment: "Cà phê ngon, nhưng hơi đắng với khẩu vị của mình.",
    likes: 3,
    date: "06/02/2025",
    verified: true,
  },
  {
    user: "ThuTrang88",
    rating: 5,
    comment: "Mùi thơm dễ chịu, vị đậm đà. Rất hài lòng!",
    likes: 7,
    date: "07/02/2025",
    verified: false,
  },
];

const commentsPerPage = 4;

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(reviews.length / commentsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  return (
    <div className="p-4 bg-white min-h-16 ">
      <h1 className="text-3xl font-extrabold pb-10">Đánh giá sản phẩm</h1>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-orange-500">4.91</span>
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="text-yellow-500" fill="currentColor" />
        ))}
        <span className="text-gray-600">296 đánh giá của khách hàng</span>
      </div>

      <div className="mt-4">
        {reviews
          .slice(
            currentPage * commentsPerPage,
            (currentPage + 1) * commentsPerPage
          )
          .map((review, index) => (
            <div key={index} className="border-b pb-3 mb-3">
              <div className="flex items-center gap-2">
                <p className="font-bold">{review.user}</p>
                {review.verified && (
                  <CheckCircle className="text-green-500" size={16} />
                )}
              </div>
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-500"
                    fill="currentColor"
                  />
                ))}
              </div>
              {review.comment && <p className="mt-2">{review.comment}</p>}
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
                <ThumbsUp size={14} /> {review.likes} thích • {review.date}
              </div>
            </div>
          ))}
      </div>

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
        activeClassName="px-3 py-2 bg-indigo-600 text-gray-500 rounded-lg"
        forcePage={currentPage}
      />
    </div>
  );
}
