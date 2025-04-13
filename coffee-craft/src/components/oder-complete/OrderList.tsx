// components/OrderList.tsx
import React from "react";
import { Order } from "@/types/product";
import OrderItem from "./OrderItem";

interface OrderListProps {
  orders: Order[];
  onReviewClick: (orderItemId: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onReviewClick }) => {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-600">
              Mã đơn hàng: <span className="font-medium">{order.id}</span>
            </div>
            <div className="text-sm text-gray-600">
              Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>

          {order.orderItems.map((item) => (
            <OrderItem
              key={item.id}
              item={item}
              onReviewClick={onReviewClick}
            />
          ))}

          <div className="flex justify-between items-center pt-4 mt-4 border-t">
            <div className="text-gray-900 font-medium text-lg">
              Tổng cộng: {Number(order.finalTotal).toLocaleString()}đ
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
