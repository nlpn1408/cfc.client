// components/OrderItem.tsx
import React from "react";
import { OrderItem as OrderItemType } from "@/types/product";

interface OrderItemProps {
  item: OrderItemType;
  onReviewClick: (orderItemId: string) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, onReviewClick }) => {
  return (
    <div className="flex items-center gap-4 py-3 border-t first:border-t-0">
      {item.product?.images?.[0]?.url ? (
        <img
          src={item.product.images[0].url}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      ) : (
        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-500">
          Không có ảnh
        </div>
      )}
      <div className="flex-1">
        <p className="font-medium text-gray-900">
          {item.product?.name || "Sản phẩm không xác định"}
        </p>
        <p className="text-sm text-gray-600">
          Mã SP: {item.product?.sku || "N/A"}
        </p>
        {item.productVariant?.name && (
          <p className="text-sm text-gray-600">
            Loại sản phẩm: {item.productVariant.name}
          </p>
        )}
        <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
      </div>
      <p className="text-gray-900 font-semibold">
        {Number(item.priceAtOrder).toLocaleString()}đ
      </p>
      <button
        className="px-4 py-2 text-sm border rounded hover:bg-gray-100"
        onClick={() => onReviewClick(item.id)}
      >
        Đánh giá
      </button>
    </div>
  );
};

export default OrderItem;
