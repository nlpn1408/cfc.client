"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  thumbnail?: string | null;
  publicationDate: string;
  author: {
    name: string;
    imgUrl?: string | null;
  };
}

export default function BlogCarousel() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_URL}/blogs`);
        const result = await res.json();
        setBlogs(result.data);
      } catch (error) {
        console.error("Lỗi khi tải blog:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="relative">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-6xl font-bold dark:text-white text-gray-800">
          Tin tức
        </h1>
        <p className="mt-2 md:mt-3 text-gray-500 text-base md:text-lg">
          Những câu chuyện thú vị về cà phê và phong cách sống. Cập nhật mỗi
          tuần!
        </p>
      </div>

      <Carousel className="relative w-full max-w-7xl mx-auto px-2">
        <CarouselContent>
          {blogs.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 px-2"
            >
              <article className="bg-white border rounded-xl overflow-hidden shadow transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]">
                <Link href={`/blog/${item.id}`} className="block group">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={item.thumbnail || "/default-thumbnail.jpg"}
                      alt={item.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-90"
                    />
                  </div>
                  <div className="flex items-center mt-2 pt-3 px-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={
                          item.author.imgUrl ||
                          "https://randomuser.me/api/portraits/lego/2.jpg"
                        }
                        alt={item.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <span className="block text-gray-900 font-medium">
                        {item.author.name}
                      </span>
                      <span className="block text-gray-500 text-sm">
                        {new Date(item.publicationDate).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 px-4 pb-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#935027] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-600 text-sm mt-2 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </Link>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-300 transition" />
      </Carousel>
    </div>
  );
}
