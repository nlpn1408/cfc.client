import Banner from "@/components/Home/Banner";
import Blogs from "@/components/Home/Blogs";
import Hero from "@/components/Home/Hero";
import NewsLetter from "@/components/Home/NewsLetter";
import ListProduct from "@/components/ListProduct";


export default function Home() {
  return (
    <>
      <Hero />
      <Banner title="New Arrivals"
        description="CDeserunt ex et in anim adipisicing do elit. Proident duis laboris cupidatat ipsum ipsum eu deserunt excepteur anim voluptate. 
      Sit dolor ex sint sit aliquip anim ullamco aliquip tempor ad. Lorem eiusmod excepteur excepteur veniam incididunt. 
      Est ullamco officia esse ullamco laboris ex aliquip dolore elit."
        buttonText="Shop Now" buttonLink="/shop" image="bg-[url(/banner/banner3.png)]" />
      <ListProduct />
      <Banner title="Best Seller"
        description="CDeserunt ex et in anim adipisicing do elit. Proident duis laboris cupidatat ipsum ipsum eu deserunt excepteur anim voluptate. 
      Sit dolor ex sint sit aliquip anim ullamco aliquip tempor ad. Lorem eiusmod excepteur excepteur veniam incididunt. 
      Est ullamco officia esse ullamco laboris ex aliquip dolore elit."  
      buttonText="Shop Now" buttonLink="/shop" image="bg-[url(/banner/banner2.png)]" />
      <ListProduct />
      <Banner title="Best Seller"
        description="CDeserunt ex et in anim adipisicing do elit. Proident duis laboris cupidatat ipsum ipsum eu deserunt excepteur anim voluptate. 
      Sit dolor ex sint sit aliquip anim ullamco aliquip tempor ad. Lorem eiusmod excepteur excepteur veniam incididunt. 
      Est ullamco officia esse ullamco laboris ex aliquip dolore elit." 
       buttonText="Shop Now" buttonLink="/shop" image="bg-[url(/banner/banner1.png)]" />
      <ListProduct />
      <Blogs />
      <NewsLetter />
    </>
  );
}4