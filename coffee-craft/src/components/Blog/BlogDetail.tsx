import React from "react";
import { Blog } from "@/types/blog";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
type Props = {
  blog: Blog;
};

const BlogDetail: React.FC<Props> = ({ blog }) => {
  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#5c3a1d]">
        {blog.title}
      </h1>

      <p className="text-sm text-gray-500 mb-6">
        Đăng ngày:{" "}
        {format(new Date(blog.publicationDate), "dd MMMM yyyy", {
          locale: vi,
        })}
      </p>

      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-auto rounded-md mb-6"
        />
      )}

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </section>
  );
};

export default BlogDetail;
