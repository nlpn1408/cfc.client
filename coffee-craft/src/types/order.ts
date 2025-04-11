<<<<<<< HEAD
export interface Order {
    id: string;
    userId: string;
    imager: string;
    rating: number;
    total: string;
    address: string;
    phone: number;
    receiverName:string;
    voucherId:string;
    status:string;
=======
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
>>>>>>> cb1b2d6 (update checkout, thankyou clear cart)
  }
  