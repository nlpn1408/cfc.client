"use client";
import React, { useEffect, useState } from "react";
import MainNav from "./main-nav";
import { CommandMenu } from "./command-menu";
import ModeToggle from "./ModeToggle";
import { LogInIcon, LogOut, ShoppingBagIcon } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
export default function SiteHeader() {
  const [user, setUser] = useState<any>(null);
  const totalQuantity = useSelector((state: RootState) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

  useEffect(() => {
    const getUserFromStorage = () => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse user data:", error);
          sessionStorage.removeItem("user");
        }
      }
    };

    getUserFromStorage();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        getUserFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  async function handleLogout() {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // ✅ Quan trọng để backend nhận diện user qua cookie
      });

      sessionStorage.removeItem("user");
      window.dispatchEvent(new Event("userChanged"));
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container lg:px-16 md:px-8 px-4 flex h-14 items-center justify-between">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 justify-end items-center gap-2">
          <CommandMenu />

          {/* Login */}
          {!user ? (
            <Link href="/login" >
              <Button
                className="bg-[#723E1E] text-white hover:bg-[#935027] dark:text-[#723E1E] dark:hover:text-white dark:bg-white dark:hover:bg-[#935027]"
              >
                Đăng nhập <LogInIcon className="lg:block hidden" size={16} />
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    {user.imgUrl ? (
                      <Avatar>
                        <AvatarImage src={user.imgUrl ?? "/avatars/01.png"} />
                        <AvatarFallback>{user.name}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <AvatarFallback>
                        {user?.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-center">
                  {user.name}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">
                  {user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/dashboard/${user.id}?page=profile`}>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <Link href="/contact">
                  <DropdownMenuItem>Support</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Đăng xuất tài khoản <LogOut size={15} className="ml-2" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link href="/cart" className="relative">
            <ShoppingBagIcon size={34} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
          <nav>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
