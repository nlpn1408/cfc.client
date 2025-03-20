// pages/product/[id].js
// import QuantitySelector from "@/components/QuantitySelector";
// import Slideshow from "@/components/SlideShowinPro";
'use client'
import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";

const data = [
    {
        title: "Product 1",
        image1: "/product/product4.png",
        image2: "/product/product2.png",
        price: 100,
        link: "/product/1",
        mota: "Cà phê nằm trong phân khúc giá cao chất lượng",
        rating: "5.0",
        khoiluong: "1kg"
    }
];
export default function ProductDetail() {

    const [showPopup, setShowPopup] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Dữ liệu sản phẩm mẫu
    const product = {
        title: "Product 1",
        image1: "/product/product4.png",
        image2: "/product/product2.png",
        price: 100,
        link: "1",
        rating: "5.0",
    };

    // Dữ liệu sản phẩm liên quan mẫu
    const relatedProducts = [
        {
            _id: "2",
            name: "Áo Polo Cao Cấp",
            price: 349000,
            quantity: 30,
            img: "/product/product2.png",
        },
        {
            _id: "3",
            name: "Áo Hoodie Dáng Rộng",
            price: 499000,
            quantity: 20,
            img: "/product/product3.png",
        },
    ];

    return (
        <div className='max-w-screen-2xl container'>
            {data.map((item, index) => (
                <div key={index} className="p-8 my-6 grid md:grid-cols-12 grid-col-1 gap-6 text-center items-center border border-black-200 divide-x rounded-xl py-6 pb-5">
                    <div className="col-span-5 col-start-2" >
                        <div>
                            <div className=" flex items-center justify-center bg-gray-900">
                                {/* <Slideshow /> */}
                            </div>
                            <div className="grid grid-cols-6 mt-10">
                                <img alt={item.title} className="col-span-2 h-40 border border-black-100 p-1 rounded-md" src={item.image2} />
                                <img alt={item.title} className="col-span-2 h-40 border border-black-100 p-1 rounded-md" src={item.image1} />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-5 col-start-7 mt-12 pl-12 text-[1.5rem] md:text-[1.75rem]  serf-start md:text-start">
                        <h2 className="text-[2rem] font-bold" >{item.title}</h2>
                        <p className="text-[1.5rem] m-3">${item.price.toFixed(2)}</p>
                        <p className="text-[1.25rem] my-4">{item.mota}</p>
                        <p className="text-[1rem] my-3">Khối lượng: <button className="ml-5 border border-black rounded-xl px-6"> {item.khoiluong}</button></p>
                        <div className="flex py-3">
                            <Button className="mx-5 col-span-full lg:col-span-1 hover:none bg-transparent border border-slate-600 text-2xl rounded-lx py-2 px-20 text-white bg-[#003f22] font-semibold  ">
                                {" "}
                                Add to cart
                            </Button>
                        </div>

                        <div className="flex">
                            <Button className="flex-auto col-span-full lg:col-span-1 hover:none bg-transparent border border-slate-600 text-2xl rounded-lx py-2 text-white bg-[#a52f21] font-semibold mt-4 ml-5">
                                Buy now
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
     
    );
}
