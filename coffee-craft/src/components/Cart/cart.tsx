import Cart from "@/app/(frontend)/cart/page";
import { ShoppingCart } from "@/types/nav";
import { Product } from "@/types/product";
export const getCart = () => {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  };
  
  // Hàm để lưu giỏ hàng vào localStorage
  export const saveCart = (cart:ShoppingCart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  
  // Hàm thêm sản phẩm vào giỏ hàng
  export const addToCart = (product: Product) => {
    const cart = getCart();
    const existingProductIndex = cart.findIndex((item:Product) => item.id === product.id);
    
    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1; // Nếu sản phẩm đã có, tăng số lượng
    } else {
      cart.push({ ...product, quantity: 1 }); // Nếu chưa có, thêm sản phẩm mới vào giỏ
    }
  
    saveCart(cart); // Lưu giỏ hàng vào localStorage
  };
  export const increaseQuantity = (productId: number) => {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === productId);
  
    if (index !== -1) {
      cart[index].quantity += 1;
      saveCart(cart);
    }
  };
  export const decreaseQuantity = (productId: number) => {
    const cart = getCart();
    const index = cart.findIndex(item => item.id === productId);
  
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1); // Xóa khỏi giỏ nếu giảm về 0
      }
      saveCart(cart);
    }
  };
  export const getCartTotal = (): number => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  export const formatCurrency = (value: number): string => {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
