// import AddressForm from '@/components/Checkout/AddressForm'
// import CartSummary from '@/components/Checkout/CartSummary'
// import PaymentMethod from '@/components/Checkout/Paymentmethod'
// import Showitem from '@/components/Checkout/Showitem'
// import SubmitBar from '@/components/Checkout/SubmitBar'
// import React from 'react'

// export default function page() {
//   return (
//     <section className='container lg:px-16 md:px-8 px-4'>
//      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
//       <div className="md:col-span-2 space-y-6">
//         <AddressForm
        
//         />
        
//         <PaymentMethod />
//         <SubmitBar />
//       </div>
//       <CartSummary />
//     </div>
//     </section>
//   )
// }
// app/checkout/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressForm from "@/components/Checkout/AddressForm";
import CartSummary from "@/components/Checkout/CartSummary";
import PaymentMethod from "@/components/Checkout/Paymentmethod";
import SubmitBar from "@/components/Checkout/SubmitBar";
import { RootState } from "@/redux/store";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [addressData, setAddressData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        name: parsed.name || "",
        email: parsed.email || "",
        phone: parsed.phone || "",
      });
    }
  }, []);

  const handleSubmitOrder = async () => {
    if (!addressData) return alert("Vui lòng điền đầy đủ địa chỉ.");

    const orderPayload = {
      customer: user,
      address: addressData,
      items: cartItems,
      payment: "COD", // có thể thay bằng lựa chọn từ PaymentMethod
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) throw new Error("Đặt hàng thất bại");
      alert("Đặt hàng thành công!");
    } catch (err) {
      console.error(err);
      alert("Đã có lỗi xảy ra khi đặt hàng");
    }
  };

  return (
    <section className="container lg:px-16 md:px-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
        <div className="md:col-span-2 space-y-6">
          <AddressForm user={user} onAddressChange={setAddressData} />
          <PaymentMethod />
          <SubmitBar onSubmit={handleSubmitOrder} />
        </div>
        <CartSummary />
      </div>
    </section>
  );
}
