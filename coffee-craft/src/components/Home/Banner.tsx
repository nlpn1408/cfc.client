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
    <section className="">
      <div
        className={cn(
          "w-full h-full bg-no-repeat bg-cover object-fill bg-left md:bg-center",
          image
        )}
      >
        <div className="container lg:px-16 md:px-8 px-4  py-10 grid grid-cols-2">
          <div className="col-span-2 md:col-span-1 flex flex-col space-y-5">
            <h1 className="text-5xl md:text-8xl font-extrabold hit-the-floor">
              {title}
            </h1>
            <p className="text-white w-2/3">{description}</p>
            <Link href={buttonLink}>
              <Button className="w-2/5 bg-white text-black hover:bg-[#935027] hover:text-white font-bold py-5 rounded">
                {buttonText} <ShoppingCart   size={30} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
