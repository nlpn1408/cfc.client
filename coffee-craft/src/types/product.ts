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
  discountPrice: string;
  price: number;
  grindType?: string;
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

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  userId: string;
  createdAt: string;
}
