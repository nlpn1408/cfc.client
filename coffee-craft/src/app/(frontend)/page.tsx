import Banner from "@/components/Home/Banner";
import Blogs from "@/components/Home/Blogs";
import Hero from "@/components/Home/Hero";
import NewsLetter from "@/components/Home/NewsLetter";
import ListProduct from "@/components/ListProduct";
import NewProducts from "../../components/Home/NewProducts";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Banner - Sản phẩm mới */}
      <Banner
        title="Sản phẩm mới"
        description="Khám phá những hạt cà phê tươi ngon nhất từ những vùng trồng cà phê danh tiếng. Hương vị đậm đà, chất lượng thượng hạng dành cho những tín đồ yêu cà phê thực thụ."
        buttonText="Mua ngay"
        buttonLink="/product"
        image="bg-[url(/banner/banner3.png)]"
      />
      <NewProducts />

      {/* Banner - Bán chạy nhất */}
      <Banner
        title="Sản phẩm bán chạy"
        description="Những loại cà phê được khách hàng yêu thích nhất. Hãy thử ngay những hương vị tuyệt hảo được tuyển chọn từ các nông trại cà phê hàng đầu."
        buttonText="Khám phá"
        buttonLink="/product"
        image="bg-[url(/banner/banner2.png)]"
      />
      <ListProduct />

      {/* Banner - Phụ kiện pha chế */}
      <Banner
        title="Phụ kiện pha chế"
        description="Từ máy pha cà phê đến dụng cụ pha chế chuyên nghiệp, chúng tôi mang đến mọi thứ bạn cần để tạo ra những tách cà phê thơm ngon ngay tại nhà."
        buttonText="Xem ngay"
        buttonLink="/product"
        image="bg-[url(/banner/banner1.png)]"
      />
      <ListProduct />

      <Blogs />
      <NewsLetter />
    </>
  );
}
