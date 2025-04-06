"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { DialogTitle, type DialogProps } from "@radix-ui/react-dialog";
import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Search } from "lucide-react";

interface ProductImage {
  id: string;
  isThumbnail: boolean;
  url: string;
}

interface Product {
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

export function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!API_URL) throw new Error("API_URL is not defined");

        const response = await fetch(`${API_URL}/products`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched products:", data);

        // Kiểm tra key chứa danh sách sản phẩm và cập nhật
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  // Hàm chuẩn hóa chuỗi (loại bỏ dấu tiếng Việt)
  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD") // Tách dấu khỏi chữ cái
      .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
      .replace(/đ/g, "d") // Chuyển "đ" → "d"
      .replace(/Đ/g, "D") // Chuyển "Đ" → "D"
      .toLowerCase(); // Chuyển về chữ thường
  };

  const filteredResults = React.useMemo(() => {
    if (!searchTerm.trim()) return [];

    // Chuẩn hóa cả dữ liệu API và searchTerm
    const searchQuery = removeVietnameseTones(searchTerm);

    return products.filter((product) => {
      const productName = removeVietnameseTones(product.name);
      return productName.includes(searchQuery);
    });
  }, [searchTerm, products]);

  // console.log(
  //   "Search Term:",
  //   searchTerm,
  //   "Normalized:",
  //   removeVietnameseTones(searchTerm)
  // );
  // console.log(
  //   "Product Names:",
  //   products.map((p) => removeVietnameseTones(p.name))
  // );

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-10 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search products...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.5rem] hidden h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <Search size={24} className="flex-shrink-0" />
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search commands</DialogTitle>
        <CommandInput
          placeholder="Type a product name to search..."
          value={searchTerm}
          onValueChange={(value) => {
            console.log("User Input:", value);
            setSearchTerm(value);
          }}
        />

        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          <CommandGroup heading="Search Results">
            {filteredResults.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} passHref>
                <CommandItem
                  onSelect={() => setOpen(false)}
                  className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-base">
                      {product.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(Number(product.price))}{" "}
                      - {product.stock} sản phẩm
                    </span>
                    <span className="text-xs text-yellow-500">
                      ⭐ {product.avgRating}/5
                    </span>
                  </div>
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
