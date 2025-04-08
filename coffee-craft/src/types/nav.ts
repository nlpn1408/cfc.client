import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface ProductCardProps {
  title: string;
  image1: any;
  image2: string;
  price: string;
  link: string;
  rating: string;
  className?: string;
}

export interface ShoppingCart{
  id: string;
  name: string;
  price: number;
  brandId: string;
  active: boolean;
  quantity: number;
  images: string;
}
 export interface CartContextType {
  cart: ShoppingCart;
  addToCart: (item: ShoppingCart) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}
export interface Cart {
  items: ShoppingCart[]; // Mảng các đối tượng sản phẩm trong giỏ
  total: number; // Tổng giá trị của giỏ hàng
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
