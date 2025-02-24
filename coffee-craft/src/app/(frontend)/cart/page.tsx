'use client'
import React from "react";
import OrderSummary from "@/components/OrderSummary";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const Cart = () => {

    return (
        <>
            <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
                        <p className="text-2xl md:text-3xl text-gray-500">
                            Your <span className="font-medium text-orange-600">Cart</span>
                        </p>
                        <p className="text-lg md:text-xl text-gray-500/80">  {/*{getCartCount()}*/} 1 Items</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto">
                            <thead className="text-left">
                                <tr>
                                    <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-600 font-medium">
                                        Product Details
                                    </th>
                                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                                        Price
                                    </th>
                                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                                        Quantity
                                    </th>
                                    <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Item in here */}
                            </tbody>
                        </table>
                    </div>
                    <Link href='/'>
                        <button

                            className="group flex items-center mt-6 gap-2 text-orange-600">
                            <ArrowLeftIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            Continue Shopping
                        </button>
                    </Link>
                </div>
                <OrderSummary />
            </div>
        </>
    );
};

export default Cart;
