"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const BlogDetailPage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Lỗi khi lấy dữ liệu blog:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-[#6b3e26]">Đang tải...</div>;
  }

  if (!blog) {
    return (
      <div className="text-center py-10 text-lg font-semibold text-red-500">
        Không tìm thấy bài viết.
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-4 md:px-8 bg-white ">
      <h1 className="text-4xl font-bold mb-4 text-[#5c3a1d] leading-snug">
        {blog.title}
      </h1>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
        <p>
          Đăng ngày:{" "}
          <span className="text-[#8b5e3c] font-medium">
            {format(new Date(blog.publicationDate), "dd MMMM yyyy", {
              locale: vi,
            })}
          </span>
        </p>
        <p>Tác giả: {blog.author?.name || "Ẩn danh"}</p>
      </div>

      {blog.thumbnail && (
        <div className="mb-8 overflow-hidden rounded-lg shadow-sm">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <article
        className="prose max-w-none prose-lg prose-img:rounded-md prose-img:shadow-md prose-headings:text-[#4b2e23] prose-p:text-gray-800 prose-a:text-[#8b5e3c] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </section>
  );
};

export default BlogDetailPage;
