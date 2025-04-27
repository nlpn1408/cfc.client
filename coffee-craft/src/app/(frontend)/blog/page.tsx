"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Blog, Author } from "@/types/blog";
// Interfaces

export default function BlogPage() {
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-[#6b3e26]">
        Tin tức Cà Phê
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#4b2e23] line-clamp-2 mb-1 group-hover:text-[#8b5e3c] transition-colors duration-200">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(blog.publicationDate).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <div
                  className="text-sm text-gray-700 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.content,
                  }}
                />
                <div className="mt-3 text-right">
                  <span className="text-sm italic text-gray-500">
                    {blog.author?.name || "Tác giả ẩn danh"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
