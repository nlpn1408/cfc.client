// components/Checkout/CartSummary.tsx
import React from 'react';

const CartSummary = () => {
  return (
    <div className="p-4 border rounded-lg bg-white w-full">
      <h3 className="font-semibold mb-4">Giỏ hàng của bạn</h3>
      
      <div className="flex items-center gap-4 mb-4">
        <img src="/coffee.png" alt="Cà phê" className="w-16 h-16" />
        <div className="flex-1">
          <p className="font-medium">Cà phê hạt Perfetto - Delta Original (1000g)</p>
          <p className="font-bold">594,000 ₫</p>
        </div>
        <div className="flex items-center gap-2">
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
      </div>

      <div className="text-sm space-y-1 border-t pt-4">
        <p className="flex justify-between"><span>Tổng cộng:</span> <span>594,000 ₫</span></p>
        <p className="font-semibold mt-4">Thông tin giao hàng</p>
        <p className="flex justify-between"><span>Giá trị đơn hàng:</span> <span>594,000 ₫</span></p>
        <p className="flex justify-between"><span>Khuyến mãi:</span> <span>-0 ₫</span></p>
        <p className="flex justify-between"><span>Phí giao hàng:</span> <span>0 ₫</span></p>
        <p className="flex justify-between font-bold"><span>Thành tiền:</span> <span className="text-red-500">594,000 ₫</span></p>
        <p className="flex justify-between"><span>Thời gian giao hàng dự kiến:</span> <span>---</span></p>
      </div>

      <div className="mt-4">
        <p className="mb-2 font-semibold">Mã giảm giá</p>
        <div className="flex gap-2">
          <input placeholder="Mã giảm giá" className="border p-2 flex-1 rounded-md" />
          <button className="bg-gray-300 px-4 py-2 rounded-md">Áp dụng</button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
