import React from "react";
import Image from "next/image";

interface OrderDetailProps {
  order: any;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold text-[#723E1E] mb-6">
        Chi tiết đơn hàng
      </h2>

      <div className="bg-white shadow rounded-lg p-6 mb-6 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Thông tin người nhận
        </h3>
        <p className="text-gray-700">
          <span className="font-medium">Tên:</span>{" "}
          {order.shippingAddress.receiverName}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Số điện thoại:</span>{" "}
          {order.shippingAddress.receiverPhone}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Địa chỉ:</span>{" "}
          {order.shippingAddress.address}
        </p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 mb-6 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sản phẩm</h3>
        {order.orderItems.map((item: any) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4 mb-4 last:mb-0 last:pb-0 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.product.images[0].url}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div>
                <p className="font-medium text-gray-800">{item.product.name}</p>
                <p className="text-sm text-gray-600">
                  Số lượng: {item.quantity} x{" "}
                  {parseInt(item.priceAtOrder).toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              {parseInt(item.subTotal).toLocaleString("vi-VN")}₫
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Thông tin đơn hàng
        </h3>
        <p className="text-gray-700">
          <span className="font-medium">Trạng thái đơn hàng:</span>{" "}
          {order.status}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Phương thức thanh toán:</span>{" "}
          {order.paymentMethod}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Ghi chú:</span>{" "}
          {order.note || "Không có"}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Tổng tiền hàng:</span>{" "}
          {parseInt(order.total).toLocaleString("vi-VN")}₫
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Phí vận chuyển:</span>{" "}
          {parseInt(order.shippingFee).toLocaleString("vi-VN")}₫
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Tổng cộng:</span>{" "}
          <span className="text-orange-600 font-bold">
            {parseInt(order.finalTotal).toLocaleString("vi-VN")}₫
          </span>
        </p>
      </div>
    </div>
  );
};

export default OrderDetail;
