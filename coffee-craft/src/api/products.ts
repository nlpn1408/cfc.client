import { Product } from "@/types/products";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      "https://coffee-craft-service.onrender.com/products"
    );
    if (!response.ok) throw new Error("Lỗi khi lấy sản phẩm");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
