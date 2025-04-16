import React from "react";
import { Button } from "../ui/button";
import { BannerProps } from "@/types/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
export default function Banner({
  image,
  title,
  description,
  buttonText,
  buttonLink,
}: BannerProps) {
  return (
      <section
        className={cn(
          "w-full h-full bg-no-repeat bg-right lg:bg-left object-fit bg-cover",
          image
        )}
      >
        <div className="container lg:px-16 md:px-8 px-4 grid grid-cols-12">
          <div className="col-span-full md:col-span-9 lg:col-span-7 flex flex-col space-y-5 py-5">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold hit-the-floor">
              {title}
            </h1>
            <p className="text-white w-2/3">{description}</p>
            <Link href={buttonLink}>
              <Button className="w-1/5 bg-white text-black hover:bg-[#935027] hover:text-white font-bold py-5 rounded">
                {buttonText} <ShoppingCart   size={30} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
  );
}
