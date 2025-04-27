import axios from "axios";
import { Order, OrderItem } from "@/types/product";

export const getMyOrders = async (token: string): Promise<Order[]> => {
  const response = await axios.get<Order[]>(
    "http://localhost:3001/orders/myorders",
    {
      headers: {
        Authorization: `Bearer ${token}`, // nếu cần token
      },
      withCredentials: true, // đúng cú pháp để gửi cookie/session
    }
  );

  return response.data;
};
