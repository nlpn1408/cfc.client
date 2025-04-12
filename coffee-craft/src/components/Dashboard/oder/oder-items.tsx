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




export default function OrderItems() {

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
        <CardTitle className="text-2xl font-semibold">Chờ xác nhận</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-200">
          {orderItems.map((order) => (
            <li key={order.id} className="items-center gap-4 py-3">
              <ul>
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
              </ul>
              <div>
                <hr/>
                <div className="flex justify-between my-4">
                  <div className="">
                    <div className="text-red-600 font-medium text-xl mt-2 mx-5 flex " >Tổng: <div className="">{order.tong}</div></div> 
                  </div>
                  <p className="text-base ">
                    <button className="rounded-xl border text-gray-600 bg-white py-2 px-4 hover:bg-[#815846] hover:text-white">Hủy đơn hàng</button>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}