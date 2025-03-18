export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  brandId: string;
  stock: number;
  active: boolean;
  avgRating: number;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  images: Image[];
}

export interface Image {
  id: string;
  isThumbnail: boolean;
}
