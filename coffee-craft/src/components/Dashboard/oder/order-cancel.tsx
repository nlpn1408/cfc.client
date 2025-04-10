import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Order } from "@/types/order";
import { Product } from '@/types/product';

const orderItems = [
  {
    id: 1,
    products:[
      {
        id:"1",
        name: "Wireless Headphones",
        loaihang:"200gr",
        price: "99.99",
        quantity: 1,
        image: "/images/headphones.jpg",
      },
      {
        idsp:"2",
        name: "Wireless Headphones",
        loaihang:"200gr",
        price: "99.99",
        quantity: 1,
        image: "/images/headphones.jpg",
      },
      {
        idsp:"3",
        name: "Wireless Headphones",
        loaihang:"200gr",
        price: "99.99",
        quantity: 1,
        image: "/images/headphones.jpg",
      }
    ],
    tong:1200,

  },
  {
    id: 2,
    products:[
      {
        idsp:"1",
        name: "Smartwatch",
        loaihang:"200gr",
        price: "$149.99",
        quantity: 1,
        image: "/images/smartwatch.jpg",
      },
      {
        idsp:"2",
        name: "Smartwatch",
        loaihang:"200gr",
        price: "$149.99",
        quantity: 1,
        image: "/images/smartwatch.jpg",
      }
    ],
    tong:1200,

  },
  {
    id: 3,
    products:[
      {
        idsp:"1",
        name: "Smartwatch",
        loaihang:"200gr",
        price: "$149.99",
        quantity: 1,
        image: "/images/smartwatch.jpg",
      }
    ],
    tong:1200,

  },
];




export default function OrderCancel() {

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async (userId: string | null) => {
    try {
      const url = `${API_URL}/orders${userId ? `?userId=${userId}` : ''}`;
      const response = await fetch(url);
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };
  // useEffect(() => {
  //   fetchOrders(userId);
  // }, [userId]);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Đã hủy</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-200">
          {orderItems.map((order) => (
            <li key={order.id} className="items-center gap-4 py-3">
              {order.products.map((product, index) =>(
              <li key={product.id || product.idsp || index} className="flex items-center gap-4 py-3">
                <img src={product.image} alt=""className="w-16 h-16 object-cover rounded-lg"/>
                 <div className="flex-1">
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Loại: {product.loaihang}
                    </p>
                    <p className="font-medium"> x {product.quantity}</p>
                 </div>
                 <p className="text-lg text-red-500">{product.price}đ</p>
              </li>
              ))}
              <hr/>
              <div className="flex justify-between my-4">
                <div className="">
                    <div className="text-red-600 font-semibold text-xl mt-3 mx-5 flex " >Tổng: <div className="">{order.tong}</div></div> 
                </div>
                <p className="text-base ">
                  <button className="text-lg rounded-xl border border-red-200 text-gray-600 bg-white mt-2 py-2 px-6 hover:bg-red-700 hover:text-white">Mua lại</button>
                </p>
               
              </div>
            </li>
              
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
