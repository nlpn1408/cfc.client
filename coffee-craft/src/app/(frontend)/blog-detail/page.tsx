"use client";

import { useRouter } from 'next/navigation';
import { posts } from '../../../../data/blog';
import { useParams } from 'next/navigation'; 
import NotFound from '@/app/not-found';

const BlogDetail = () => {
  const router = useRouter();
  const {id} = useParams();

  if (!id) {
    return <div ><NotFound/></div>;
  }

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <div className="text-center text-xl text-red-600">Bài viết không tìm thấy!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
        <p className="text-sm text-gray-600 mt-2">{new Date(post.date).toLocaleDateString()}</p>
        <div className="mt-4 text-lg text-gray-800">{post.content}</div>
      </div>
    </div>
  );
};

export default BlogDetail;
