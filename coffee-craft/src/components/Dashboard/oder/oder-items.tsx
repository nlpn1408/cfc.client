"use client";

import React, { useState, useEffect } from "react";
import { Order } from "@/types/product";
import toast from "react-hot-toast";
import OrderDetailPopup from "./oder-detail";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

export default function OrderItems() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/orders/myorders`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Không thể lấy đơn hàng.");

      const data = await res.json();
      const pendingOrders = data.filter(
        (order: Order) => order.status === "PENDING"
      );
      setOrders(pendingOrders);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Không thể hủy đơn hàng.");

      toast.success("Đã hủy đơn hàng.");
      setOrderToCancel(null); // đóng dialog
      fetchOrders();
    } catch (err: any) {
      toast.error(err.message || "Đã xảy ra lỗi khi hủy đơn hàng.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (orders.length === 0)
    return <p className="text-center text-gray-500">Không có đơn hàng nào.</p>;

  return (
    <div className="w-full space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-4 cursor-pointer border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          onClick={() => setSelectedOrder(order)}
        >
          <div className="flex justify-between mb-2">
            <div>
              Mã: <span className="font-medium">{order.id}</span>
            </div>
            <div>
              Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>

          {order.orderItems.map((item, index) => (
            <div
              key={item.id || index}
              className="flex gap-4 py-3 border-t first:border-t-0"
            >
              {item.product?.images?.[0]?.url ? (
                <img
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  Không có ảnh
                </div>
              )}
              <div className="flex-1">
                <p className="font-medium">
                  {item.product?.name || "Sản phẩm không xác định"}
                </p>
                <p className="text-sm text-gray-600">
                  Số lượng: {item.quantity}
                </p>
              </div>
              <div className="font-semibold">
                {Number(item.priceAtOrder).toLocaleString()}đ
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between pt-4 mt-4 border-t">
            <div className="text-lg font-medium">
              Tổng: {Number(order.finalTotal).toLocaleString()}đ
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrderToCancel(order);
                  }}
                  className="mt-3 sm:mt-0 px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
                >
                  Hủy đơn
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận hủy đơn hàng?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bạn có chắc chắn muốn hủy đơn hàng chứa{" "}
                    <b>{order.orderItems[0]?.product?.name || "sản phẩm"}</b>?
                    Thao tác này không thể hoàn tác.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOrderToCancel(null)}>
                    Đóng
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleCancelOrder(order.id)}
                  >
                    Hủy đơn
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      ))}

      {/* Popup xem chi tiết đơn hàng */}
      {selectedOrder && (
        <OrderDetailPopup
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
