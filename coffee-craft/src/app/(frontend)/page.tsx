'use client'
import { useEffect, useState } from "react";
import Banner from "@/components/Home/Banner";
import Blogs from "@/components/Home/Blogs";
import Hero from "@/components/Home/Hero";
import NewsLetter from "@/components/Home/NewsLetter";
import ListProduct from "@/components/ListProduct";
import NewProducts from "../../components/Home/NewProducts";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import CategoryProducts from "../../components/Home/CategoryProducts";

const metadata = [
  {
    title: "Cà phê Việt Nam",
    description: "Khám phá những hạt cà phê tươi ngon nhất từ những vùng trồng cà phê danh tiếng. Hương vị đậm đà, chất lượng thượng hạng dành cho những tín đồ yêu cà phê thực thụ.",
    buttonText: "Mua ngay",
    buttonLink: "/product",
    image: "bg-[url(/banner/banner3.png)] lg:py-10",
    category: 'Cà phê'
  },
  {
    title: "Dụng cụ cà phê",
    description: "Những loại cà phê được khách hàng yêu thích nhất. Hãy thử ngay những hương vị tuyệt hảo được tuyển chọn từ các nông trại cà phê hàng đầu.",
    buttonText: "Mua ngay",
    buttonLink: "/product",
    image: "bg-[url(/banner/banner2.png)] lg:py-10",
    category: 'Dụng cụ pha cà phê'
  }
];

export default function Home() {
// Hook state lưu danh sách categories
const [categories, setCategories] = useState<any[]>([]);

// Fetch danh sách category khi component mount
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();

      // Nếu có data dạng mảng thì cập nhật vào state
      if (Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.warn("Dữ liệu trả về không hợp lệ:", data);
      }
    } catch (error) {
      console.error("Lỗi khi load category:", error);
    }
  };

  fetchCategories();
}, []);


// Hàm tìm categoryId từ tên (case-insensitive)
const getCategoryIdByName = (nameFromMetadata: string): string | null => {
  if (!Array.isArray(categories)) return null;

  const normalizedInput = nameFromMetadata.trim().toLowerCase();

  const matchedCategory = categories.find(
    (category) => category.name.trim().toLowerCase() === normalizedInput
  );

  return matchedCategory ? matchedCategory.id : null;
};

  return (
    <>
      <Hero />
      <Banner
        title="Sản Phẩm mới"
        description="Từ máy pha cà phê đến dụng cụ pha chế chuyên nghiệp, chúng tôi mang đến mọi thứ bạn cần để tạo ra những tách cà phê thơm ngon ngay tại nhà."
        buttonText="Khám phá"
        buttonLink="/product"
        image="bg-[url(/banner/banner2.png)]  lg:py-10"
      />
      <NewProducts />
      {metadata.map((item, index) => {
        return (
          <div key={index}>
            <Banner
              title={item.title}
              description={item.description}
              buttonText={item.buttonText}
              buttonLink={item.buttonLink}
              image={item.image}
            />

            <section className="container lg:px-16 md:px-8 px-4 py-10">
              <div className="flex justify-between mb-5">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <Link
                  href={item.buttonLink}
                  className="flex items-center dark:text-white dark:hover:text-[#683122] text-md text-slate-700 hover:text-[#683122]"
                >
                  Xem thêm <ChevronRightIcon size={20} />
                </Link>
              </div>
              <CategoryProducts categoryId={String(getCategoryIdByName(item.category))} />
            </section>
          </div>
        );
      })}
      <Blogs />
      <NewsLetter />
    </>
  );
}
