import React from "react";
export default function ProductFilter() {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center py-5 border-b gap-3">
        <span className="text-sm text-gray-600">
          Trang chủ &gt; Shop &gt; Cà phê nguyên chất
        </span>
        <select
          name="orderby"
          className="orderby bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 transition-all duration-300"
          aria-label="Đơn hàng của cửa hàng"
          defaultValue="Thứ tự mặc định"
        >
          <option value="Thứ tự mặc định">Thứ tự mặc định</option>
          <option value="Thứ tự theo mức độ phổ biến">
            Thứ tự theo mức độ phổ biến
          </option>
          <option value="Thứ tự theo điểm đánh giá">
            Thứ tự theo điểm đánh giá
          </option>
          <option value="Mới nhất">Mới nhất</option>
          <option value="Thứ tự theo giá: thấp đến cao">
            Thứ tự theo giá: thấp đến cao
          </option>
          <option value="Thứ tự theo giá: cao xuống thấp">
            Thứ tự theo giá: cao xuống thấp
          </option>
        </select>
      </div>
    </>
  );
}
