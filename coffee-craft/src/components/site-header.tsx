"use client";
import React, { useEffect, useState } from "react";
import MainNav from "./main-nav";
import { CommandMenu } from "./command-menu";
import ModeToggle from "./ModeToggle";
import { LogIn, LogInIcon, LogOut, ShoppingBagIcon, User } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function SiteHeader({ session }: { session: Session | null }) {
  const user = session?.user;
  const router = useRouter();
  async function handleLogout() {
    await signOut();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-around">
        <MainNav />
        <MobileNav />
        <div className="flex justify-end flex-1 items-center gap-2">
          <CommandMenu />
          {/* Login */}
          {session && session.user && user?.email
            ? (
              <Button asChild>
                <Link href="/login">
                  Login<LogInIcon size={16} className="ml-2" />
                </Link>
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <Avatar>
                      {/* {user.image ? (
                        <AvatarFallback>{user.name}</AvatarFallback>
                      ) : (
                       
                      )} */}
                       <AvatarImage src="/avatars/01.png" />
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {/* <DropdownMenuLabel className="text-center">{user.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-center font-light text-sm text-slate-500">{user.email}</DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Link href='/dashboard/1'>Dashboard</Link></DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLogout()}>Logout <LogOut size={15} className="ml-2" /></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }
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
