'use client'
import React from "react";
import OrderSummary from "@/components/OrderSummary";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { getCart } from "@/components/Cart/cart";
import QuantitySelector from "@/components/QuantitySelector";
import Image from 'next/image';


const Cart = () => {
    const cart = getCart();
    return (
        <>
            <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
                        <p className="font-medium text-2xl md:text-3xl text-red-700">
                            Giỏ hàng <span className="text-gray-500">của bạn</span>
                        </p>
                        <p className="text-lg md:text-xl text-gray-500/80">  {/*{getCartCount()}*/} 1 Items</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed">
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
                                {/* {cart.length === 0 ? (
                                    <tr>
                                    <td colSpan={3}>Giỏ hàng của bạn trống.</td>
                                    </tr>
                                ) : (
                                    cart.map((item: any) => ( */}
                                    {/* <tr key={item.id}>
                                        <td>
                                            <div>{item.name}</div>
                                            <div>{item.image}</div>
                                        </td>
                                        <td></td>
                                        <td><div className="flex items-center">
                                                <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded-l">
                                                -
                                                </button>
                                                <span className="px-3">{item.quantity}</span>
                                                <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded-r">
                                                +
                                                </button>
                                                <button onClick={() => removeFromCart(item.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">
                                                x
                                                </button>
                                            </div>
                                        </td>
                                        <td>{item.price} VND</td>
                                    </tr> */}
                                    {/* ))
                                )} */}
                                <tr>
                                    <td className="flex">
                                        <div className="w-24"><img src="/product/product1.png" alt="" /></div>
                                        <div className="pt-2">
                                            <div className="text-lg">Cafe</div>
                                            <div><p>Khối lượng:1kg</p></div>
                                        </div>
                                    </td>
                                    <td><p>100.000đ</p></td>
                                    <td><div className="pl-4">1</div>
                                        {/* <div className="flex items-center">
                                            <button onClick={() => decreaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded-l">
                                            -
                                            </button>
                                            <span className="px-3">{item.quantity}</span>
                                            <button onClick={() => increaseQuantity(item.id)} className="px-2 py-1 bg-gray-300 rounded-r">
                                            +
                                            </button>
                                            <button onClick={() => removeFromCart(item.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">
                                            x
                                            </button>
                                        </div> */}
                                    </td>
                                    <td><div className="font-medium text-xl">100.000đ</div> </td>
                                    <td><a href=""><div className="opacity-30 hover:opacity-70 transition duration-300 text-xl font-semibold">x</div></a></td>
                                </tr>
                                <hr/>
                                
                            </tbody>
                            
                        </table>
                        <hr/>
                        {/* <div className="text-xl mx-10 font-semibold my-6">Tổng tiền:  <div className="font-bold float-right px-5 text-3xl text-red-600"> 200.000đ</div></div> */}
                        
                    </div>
                    <Link href='/'>
                        <button

                            className="group flex items-center mt-6 gap-2 text-red-500">
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
