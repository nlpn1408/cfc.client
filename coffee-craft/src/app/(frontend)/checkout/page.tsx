// app/checkout/page.tsx
"use client";

import AddressForm from "@/components/Checkout/AddressForm";
import CartSummary from "@/components/Checkout/CartSummary";
import PaymentMethod from "@/components/Checkout/Paymentmethod";
import SubmitBar from "@/components/Checkout/SubmitBar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CartInitializer from "@/components/CartInitializer";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [user, setUser] = useState({ name: '', phone: '', email: '' });
  const [address, setAddress] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState<string>("cod"); // default: cod
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email,
      });
    }
  }, []);
  

  return (
    <section className="container lg:px-16 md:px-8 px-4">
      <CartInitializer /> {/* Load giỏ hàng từ localStorage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
        <div className="md:col-span-2 space-y-6">
          <AddressForm user={user} onAddressChange={setAddress} />
          <PaymentMethod selected={paymentMethod} onChange={setPaymentMethod} />
          <SubmitBar
            address={address}
            paymentMethod={paymentMethod}
            cartItems={cartItems}
            user={user}
          />
        </div>
        <CartSummary />
      </div>
    </section>
  );
}
