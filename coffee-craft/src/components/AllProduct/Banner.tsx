import React from "react";

export default function BannerPro() {
  return (
    <div className="w-full h-80 bg-[url(/banner/banner1.png)] bg-no-repeat bg-cover bg-center flex items-center">
      <div className="px-6 md:px-20 lg:px-[182px] py-10 text-white text-center md:text-left">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Giúp bạn chọn được túi cà phê sạch…
        </h1>
        <p className="mt-3 text-sm md:text-base max-w-xl">
          Trên thị trường có đến 90% là cà phê “đại trà” - sản xuất không tiêu
          chuẩn, hương vị kém...
        </p>
      </div>
    </div>
  );
}
