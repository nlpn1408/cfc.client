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
  image1: string;
  image2: string;
  price: number;
  link: string;
  rating: string;
}

export interface TextInputProps {
  label: string,
  register: any,
  name: string,
  errors: any,
  type?: string
  placeholder: string
  page?: string
  className?: string
  isRequired?: boolean
}


export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
