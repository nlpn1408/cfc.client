// components/OrderComplete.tsx
import React, { useState, useEffect } from "react";
import OrderList from "@/components/Dashboard/oder/ReviewProduct/OrderList";
import ReviewPopup from "@/components/Dashboard/oder/ReviewProduct/ReviewPopup";
import { Order } from "@/types/product";
import toast from "react-hot-toast";

export default function OrderComplete() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedOrderItemId, setSelectedOrderItemId] = useState<string | null>(
    null
  );

  // Fetch the current userId (session info)
  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy thông tin người dùng.");
      }

      const user = await response.json();
      if (user?.id) {
        setUserId(user.id);
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi lấy thông tin người dùng.");
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/orders/myorders`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu đơn hàng.");
      }

      const result = await response.json();
      const deliveredOrders = result.filter(
        (order: Order) => order.status === "DELIVERED"
      );
      setOrders(deliveredOrders);
    } catch (err) {
      setError("Đã xảy ra lỗi khi tải đơn hàng.");
    } finally {
      setLoading(false);
    }
  };

  // Handle review submission
  const handleReviewSubmit = async () => {
    if (!rating || !comment || !userId || !selectedOrderItemId) {
      alert("Vui lòng nhập đầy đủ thông tin đánh giá.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          rating,
          comment,
          orderItemId: selectedOrderItemId,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi gửi đánh giá.");
      }

      toast.success("Đánh giá sản phẩm thành công");
      setRating(null);
      setComment("");
      setShowPopup(false);
    } catch (error) {
      alert("Đã xảy ra lỗi khi gửi đánh giá.");
    }
  };

  const handleOpenPopup = (orderItemId: string) => {
    setSelectedOrderItemId(orderItemId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setRating(null);
    setComment("");
  };

  useEffect(() => {
    fetchUserInfo();
    fetchOrders();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <p className="text-center text-gray-500">Đang tải...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">
          Không có đơn hàng nào đã giao.
        </p>
      ) : (
        <OrderList orders={orders} onReviewClick={handleOpenPopup} />
      )}

      {showPopup && (
        <ReviewPopup
          rating={rating}
          comment={comment}
          onRatingChange={setRating}
          onCommentChange={setComment}
          onSubmit={handleReviewSubmit}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
