// Định nghĩa kiểu ProductImage
export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  order: number;
  isThumbnail: boolean;
  createdAt: string;
  updatedAt: string;
}
// Cập nhật lại OrderItem với kiểu images là ProductImage[]

export interface OrderDisplay {
  id: string;
  createdAt: string;
  status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentMethod: "COD" | "BANKING" | "PAYPAL" | "MOMO";

  total: number;
  shippingFee: number;
  discountAmount: number;
  finalTotal: number;
  note?: string;

  shippingAddress: {
    receiverName: string;
    receiverPhone: string;
    address: string;
  };

  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    subTotal: number;
    image: string;
  }[];
}
// types/order.ts
export interface OrderItemInput {
  productId: string;
  quantity: number;
  price: number;
  grindType?: string | null;
}

export interface ShippingAddressInput {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface CreateOrderPayload {
  userId: string;
  total: number;
  shippingFee: number;
  discountAmount: number;
  finalTotal: number;
  voucherCode?: string | null;
  paymentMethod: "COD" | "BANK";
  note?: string;
  shippingAddress: ShippingAddressInput;
  items: OrderItemInput[];
}
