// src/types/Product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  categoryId: string;
  brandId: string;
  stock: number;
  active: boolean;
  avgRating: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
}

export interface ProductImage {
  id: string;
  isThumbnail: boolean;
  url: string;
}
