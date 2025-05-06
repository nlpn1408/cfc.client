// components/ReviewPopup.tsx
import React from "react";

interface ReviewPopupProps {
  rating: number | null;
  comment: string;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function ReviewPopup({
  rating,
  comment,
  onRatingChange,
  onCommentChange,
  onSubmit,
  onClose,
}: ReviewPopupProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>

        {/* Rating Stars */}
        <div>
          <label className="block text-sm text-gray-600">Đánh giá:</label>
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRatingChange(star)}
                className={`text-2xl ${rating && rating >= star ? "text-yellow-500" : "text-gray-400"} transition-colors`}
                title={`Rate ${star} stars`}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Review Comment */}
        <div>
          <label
            htmlFor="review-comment"
            className="block text-sm text-gray-600"
          >
            Nhận xét:
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
            rows={4}
            placeholder="Nhập nhận xét của bạn"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Hủy
          </button>
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-[#723E1E] hover:bg-[#935027] text-white rounded-md"
          >
            Gửi Đánh Giá
          </button>
        </div>
      </div>
    </div>
  );
}
