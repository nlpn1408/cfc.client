import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const orderItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99.99",
    quantity: 1,
    image: "/images/headphones.jpg",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: "$149.99",
    quantity: 1,
    image: "/images/smartwatch.jpg",
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: "$29.99",
    quantity: 2,
    image: "/images/laptop-stand.jpg",
  },
];

export default function OrderItems() {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Đơn hàng </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-gray-200">
          {orderItems.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">
                  {item.price} x {item.quantity}
                </p>
              </div>

              <button className=" hover:text-red-500 ">Hủy đơn hàng</button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
