import { Product } from "@/types/product";
import { baseApi } from ".";

export const getAllProducts = async (): Promise<Product | null> => {
  try {
    const response = await baseApi.get<Product>("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return null;
  }
};
