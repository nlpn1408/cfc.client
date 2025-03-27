"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, CreditCard } from "lucide-react";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    paymentMethod: "cod",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Thông tin giao hàng */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Thông tin giao hàng</h3>
            <form className="space-y-4">
              <Input
                name="name"
                placeholder="Họ và tên"
                onChange={handleChange}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <Input
                name="address"
                placeholder="Địa chỉ"
                onChange={handleChange}
              />
              <Input
                name="city"
                placeholder="Thành phố"
                onChange={handleChange}
              />
              <Input
                name="zip"
                placeholder="Mã bưu điện"
                onChange={handleChange}
              />
            </form>
          </CardContent>
        </Card>

        {/* Tóm tắt đơn hàng */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h3>
            <div className="flex justify-between border-b pb-2 mb-2">
              <span>Sản phẩm</span>
              <span className="font-semibold">$120</span>
            </div>
            <div className="flex justify-between border-b pb-2 mb-2">
              <span>Phí vận chuyển</span>
              <span className="font-semibold">$10</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng cộng</span>
              <span>$130</span>
            </div>

            {/* Phương thức thanh toán */}
            <h3 className="text-lg font-semibold mt-4">
              Phương thức thanh toán
            </h3>
            <div className="space-y-2 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === "cod"}
                  onChange={handleChange}
                />
                Thanh toán khi nhận hàng
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === "paypal"}
                  onChange={handleChange}
                />
                Thanh toán qua PayPal
              </label>
            </div>

            <Button className="w-full mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <CreditCard size={18} /> Thanh toán ngay
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
