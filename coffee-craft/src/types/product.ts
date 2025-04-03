// src/types/Product.ts
export interface Product {
  id: string;
  sku: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  discountPrice: string;
  categoryId: string;
  brandId: string;
  stock: number;
  active: boolean;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  tags: Tag[];
  variants: Variant[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  order: number;
  isThumbnail: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  // Định nghĩa Variant nếu có dữ liệu chi tiết
}

export interface CartItem {
  id: string;
  productId: string;
  product: any; // Thông tin sản phẩm
  images: ProductImage[];
  quantity: number;

  price: number;
}

// 🛒 Cập nhật `CartState` để dùng `CartItem` thay vì `OrderItem`
export interface CartState {
  cartItems: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export interface Brand {
  id: string;
  name: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    products: number;
  };
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  subTotal: string;
  createdAt: string;
  updatedAt: string;
  order: Order;
  product: Product;
}

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  userId: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  total: string;
  status: OrderStatus;
  voucherId?: string;
  shippingAddressId: string;
  orderDate: string;
  paymentMethod: PaymentMethod;
  note?: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  voucher?: Voucher;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export enum PaymentMethod {
  COD = "COD",
  CREDIT_CARD = "CREDIT_CARD",
  PAYPAL = "PAYPAL",
}
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Voucher {
  id: string;
  code: string;
  discountPercent: string;
  maxDiscount: string;
  type: VoucherType;
  startDate: string;
  endDate: string;
  usedLeft: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  orders: Order[];
}

export enum VoucherType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

export interface ShippingAddress {
  id: string;
  userId: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export interface CartState {
  cartItems: CartItem[]; // Chúng ta dùng OrderItem thay vì Product vì các thông tin về số lượng, giá trị, sản phẩm đã được đặt
  totalQuantity: number;
  totalPrice: number;
}
