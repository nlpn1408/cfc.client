import React from "react";
import { Order } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface OrderDetailPopupProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailPopup ({ order, onClose }:OrderDetailPopupProps)  {
  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          <DialogDescription>Xem thông tin chi tiết đơn hàng của bạn.</DialogDescription>
        </DialogHeader>

        {/* Thông tin đơn hàng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
          <div><span className="font-semibold">Mã đơn hàng:</span> {order.id}</div>
          <div><span className="font-semibold">Ngày đặt:</span> {new Date(order.createdAt).toLocaleDateString()}</div>
          <div><span className="font-semibold">Người nhận:</span> {order.shippingAddress?.receiverName}</div>
          <div><span className="font-semibold">Số điện thoại:</span> {order.shippingAddress?.receiverPhone}</div>
          <div className="md:col-span-2">
            <span className="font-semibold">Địa chỉ:</span> {order.shippingAddress?.address}
          </div>
          {order.note && (
            <div className="md:col-span-2">
              <span className="font-semibold">Ghi chú:</span> {order.note}
            </div>
          )}
          <div><span className="font-semibold">Phương thức thanh toán:</span> {order.paymentMethod}</div>
          <div><span className="font-semibold">Voucher:</span> {order.voucher?.code || "Không có"}</div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Sản phẩm trong đơn</h3>
          <div className="divide-y">
            {order.orderItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3">
                {/* Ảnh */}
                {item.product?.images?.[0]?.url ? (
                  <img
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded-md">
                    Không có ảnh
                  </div>
                )}

                {/* Thông tin */}
                <div className="flex-1">
                  <p className="font-medium">{item.product?.name || "Sản phẩm không xác định"}</p>
                  {item.productVariant?.name && (
                    <p className="text-xs text-gray-500">Loại: {item.productVariant.name}</p>
                  )}
                  <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                </div>

                {/* Giá */}
                <div className="font-semibold whitespace-nowrap">
                  {Number(item.priceAtOrder).toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tổng cộng */}
        <div className="text-right text-lg font-bold pt-6 border-t mt-4">
          Tổng cộng: {Number(order.finalTotal).toLocaleString()}đ
        </div>
      </DialogContent>
    </Dialog>
  );
};


