import React from 'react'
import OrderSummary from '../OrderSummary'
import { ArrowLeftIcon, X } from 'lucide-react'
import Link from 'next/link'
import { productsDummyData } from '../../../data/db'
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Showitem() {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
                        <p className="text-2xl md:text-3xl text-gray-500">
                            Check<span className="font-medium text-orange-600">Out</span>
                        </p>
                        <p className="text-lg md:text-xl text-gray-500/80">  {/*{getCartCount()}*/} 1 Items</p>
                    </div>
                    <div className="">
                        <div className="max-h-screen overflow-y-auto">
                            <table className="min-w-full table-auto">
                                <thead className="text-left">
                                    <tr>
                                        <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium text-left">
                                            Product Details
                                        </th>
                                        <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium text-center">
                                            Price
                                        </th>
                                        <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium text-center">
                                            Quantity
                                        </th>
                                        <th className="pb-6 md:px-4 px-1 text-gray-600 font-medium text-center">
                                            Subtotal
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsDummyData.map((item) => (
                                        <tr key={item._id} className="border-b border-gray-200">
                                            <td className="flex gap-4 items-center py-6 md:px-4 px-1">
                                                <img
                                                    src={item.image[0]}
                                                    alt={item.name}
                                                    className="w-20 h-28 object-cover rounded"
                                                />
                                                <div>
                                                    <h4 className="font-semibold">{item.name}</h4>
                                                    {/* <p className="text-sm text-gray-500">
                                                        Body text for whatever you’d like to say...
                                                    </p> */}
                                                </div>
                                            </td>
                                            <td className="text-center align-center pt-6 md:px-4 px-1">
                                                {item.price.toLocaleString()} VND
                                            </td>
                                            <td className="text-center align-center pt-6 md:px-4 px-1">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span>1</span>
                                                </div>
                                            </td>
                                            <td className="text-center align-center pt-6 md:px-4 px-1">
                                                {item.price.toLocaleString()} VND
                                            </td>
                                    
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
    )
}
