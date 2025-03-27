"use client";
import React, { useEffect, useState } from "react";
import MainNav from "./main-nav";
import { CommandMenu } from "./command-menu";

import ModeToggle from "./ModeToggle";
import { LogInIcon, LogOut, ShoppingBagIcon } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function SiteHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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

    const handleUserChange = () => {
      getUserFromStorage();
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  async function handleLogout() {
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-around">
        <MainNav />
        <MobileNav />
        <div className="flex justify-end flex-1 items-center gap-2">
          <CommandMenu />

          {/* Login */}
          {!user ? (
            <Button asChild>
              <Link href="/login">
                Login <LogInIcon size={16} className="ml-2" />
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    {user?.image ? (
                      <AvatarImage src={user.image} />
                    ) : (
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href={`/dashboard/${user.id}?page=profile`}>Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout <LogOut size={15} className="ml-2" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link href="/cart">
            <ShoppingBagIcon size={34} />
          </Link>
          <nav>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
