"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { useMetaColor } from "@/hooks/use.meta-color";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { setMetaColor, metaColor } = useMetaColor();

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open);
      setMetaColor(open ? "#09090b" : metaColor);
    },
    [setMetaColor, metaColor]
  );

  return (
    <Drawer direction="left" open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="!size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="h-full w-3/4 max-w-xs p-6 rounded-none">
        <DrawerTitle className="sr-only">Navigation Menu</DrawerTitle>
        <div className="flex flex-col space-y-5">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold text-[#412017] hover:text-[#E1991D]"
          >
            Coffee<span className="text-[#E1991D]">Craft</span>
          </Link>

          {/* Links */}
          <div className="flex flex-col space-y-4 text-base text-gray-700">
            <Link href="/" className="hover:text-orange-600 transition">
              Trang Chủ
            </Link>
            <Link href="/product" className="hover:text-orange-600 transition">
              Cửa Hàng
            </Link>
            <Link href="/blog" className="hover:text-orange-600 transition">
              Tin tức
            </Link>
            <Link href="/contact" className="hover:text-orange-600 transition">
              Liên hệ
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
