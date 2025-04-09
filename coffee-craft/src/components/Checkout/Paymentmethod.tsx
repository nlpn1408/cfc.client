// components/Checkout/PaymentMethod.tsx
import React from 'react';

const PaymentMethod = () => {
  return (
    <div className="p-4 border rounded-lg bg-white w-full mt-6">
      <h2 className="text-lg font-semibold mb-4">Chọn hình thức thanh toán</h2>

      <div className="grid grid-cols-3 gap-4">
        <label className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
          <input type="radio" name="payment" defaultChecked />
          <img src="/momo-logo.png" alt="MoMo" className="w-8 h-8" />
          <span>Ví MoMo</span>
        </label>

        <label className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
          <input type="radio" name="payment" />
          💳 <span>ATM / Internet banking</span>
        </label>

        <label className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
          <input type="radio" name="payment" />
          💳 <span>Thẻ tín dụng</span>
        </label>

        <label className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
          <input type="radio" name="payment" />
          🔳 <span>QR code</span>
        </label>

        <label className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
          <input type="radio" name="payment" />
          💵 <span>Thanh toán khi nhận hàng</span>
        </label>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input type="checkbox" defaultChecked />
        <label>Tôi đồng ý thỏa thuận bảo mật và chính sách mua hàng của <strong>Perfetto</strong></label>
      </div>
    </div>
  );
};

export default PaymentMethod;
