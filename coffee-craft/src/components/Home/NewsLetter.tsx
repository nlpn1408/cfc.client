"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function NewsLetter() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/send-voucher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Lỗi không xác định');
      }

      setSuccess(true);
      toast.success('🎉 Mã giảm giá đã được gửi đến email của bạn!');
    } catch (err: any) {
      console.error(err);
      toast.error(`Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="relative my-5 ">
      <div className="relative container z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-8 gap-y-4">
          <img src="/banner/poster1.png" className="col-span-1 w-full h-full" alt="" />
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-x-3 space-y-5 md:justify-end">
            <h1 className="text-2xl lg:text-4xl text-[#A52F21] font-extrabold text-center">NHẬN NGAY MÃ GIẢM 10%</h1>
            <p className="text-center text-sm">
              Nhập email để nhận mã
              <span className="font-bold"> giảm 10%</span> tối đa
              <span className="font-bold"> 20k</span> <br />
              (Chỉ áp dụng cho <span className="font-bold">khách mới</span>)
            </p>
            <div className="flex">
              <div className="relative">
                <svg
                  className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="ml-2 block w-auto py-2 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow"
              >
                {loading ? "Đang gửi..." : "Subscribe"}
              </button>
            </div>

            {success && (
              <p className="text-green-600 text-sm text-center">
                🎉 Mã giảm giá đã được gửi đến email của bạn!
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full newsletter"></div>
    </section>
  );
}
