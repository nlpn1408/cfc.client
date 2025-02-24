import Banner from "@/components/Home/Banner";
import Hero from "@/components/Home/Hero";
import ListProduct from "@/components/ListProduct";
import NewsLetter from "@/components/NewsLetter";
import ProductCard from "@/components/ProductCard";


export default function Home() {
  return (
    <>
      <Hero />
      <Banner />
      <ListProduct />
      <NewsLetter />
    </>
  );
}
