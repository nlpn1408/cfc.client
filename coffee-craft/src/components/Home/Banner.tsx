import React from "react";
import { Button } from "../ui/button";
import { BannerProps } from "@/types/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
          "w-full h-full bg-no-repeat bg-cover bg-left md:bg-center",
          image
        )}
      >
        <div className="container max-w-screen-2xl py-20 grid grid-cols-2">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-10 md:gap-12">
            <h1 className="text-5xl md:text-9xl font-extrabold hit-the-floor">
              {title}
            </h1>
            <p className="text-white w-2/3">{description}</p>
            <Link href={buttonLink}>
              <Button className="w-2/5 text-white font-bold py-2 px-4 rounded">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
