"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressForm from "@/components/Checkout/AddressForm";
import CartSummary from "@/components/Checkout/CartSummary";
import PaymentMethod from "@/components/Checkout/Paymentmethod";
import SubmitBar from "@/components/Checkout/SubmitBar";
import CartInitializer from "@/components/CartInitializer";
import { RootState } from "@/redux/store";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [user, setUser] = useState({ id: "", name: "", phone: "", email: "" });
  const [address, setAddress] = useState<any>({});
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        id: parsed.id,
        name: parsed.name,
        phone: parsed.phone,
        email: parsed.email,
      });
    }
  }, []);

  return (
    <section className="container lg:px-16 md:px-8 px-4">
      <CartInitializer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
        <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-lg shadow flex flex-col gap-5">
          <AddressForm user={user} onChange={setAddress} />
          <PaymentMethod selected={paymentMethod} onChange={setPaymentMethod} />
          <SubmitBar
            user={user}
            address={address}
            paymentMethod={paymentMethod}
            cartItems={cartItems}
          />
        </div>
        <CartSummary />
      </div>
    </section>
  );
}
