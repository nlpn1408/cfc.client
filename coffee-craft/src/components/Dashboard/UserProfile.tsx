'use client'
import React, { use, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Profile from './Profile'
import ChangePassword from './ChangePassword'
import OrderPage from './Orderpage'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Separator } from "../ui/separator"
import type { UserProfile } from '@/types/types'
import { Avatar } from 'flowbite-react'
import { AvatarFallback, AvatarImage } from '../ui/avatar'

export default function UserProfile() {
  const params = useSearchParams()
  const page = params.get('page') ?? 'profile'
  const router = useRouter()
  
  // Các bước/tab điều hướng trong trang cá nhân
  const steps = [
    {
      title: "Thông tin cá nhân",
      page: "profile",
      component: <Profile title="Thông tin cá nhân" />,
    },
    {
      title: "Đổi mật khẩu",
      page: "changepassword",
      component: (
        <ChangePassword
          title="Đổi mật khẩu"
          page="changepassword"
          description=""
        />
      ),
    },
    {
      title: "Lịch sử đơn hàng",
      page: "oder",
      component: (
        <OrderPage title="Lịch sử đơn hàng" page="order" description="" />
      ),
    },
  ];

  // Xác định tab hiện tại
  const currentStep = steps.find((step) => step.page === page);

  return (
    <section className="max-w-screen-2xl container">
      <div className="grid grid-cols-4 gap-5">
        {/* Tiêu đề trang */}
        <div className="col-span-full bg-slate-200 rounded-lg p-5">
          <h1 className="text-4xl font-bold">Trang cá nhân</h1>
          <div>
            <span
              onClick={() => router.push("/")}
              className="hover:text-slate-800 cursor-pointer"
            >
              Trang chủ
            </span>{" "}
            /
            <span className="hover:text-slate-800 cursor-pointer">
              Bảng điều khiển
            </span>
          </div>
        </div>
      {/* {user && (
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={user.imgUrl || undefined} />
                <AvatarFallback>{user?.name?.charAt(0) || "?"}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          )} */}

        {/* Sidebar - điều hướng các mục */}
        <div className="lg:col-span-1 col-span-full flex lg:flex-col gap-3 divide-gray-200 h-full dark:bg-slate-900">
          {steps.map((step, i) => (
            <div key={i} className="py-1">
              <Link
                href={`/dashboard/1?page=${step.page}`}
                className={cn(
                  `block uppercase text-sm lg:col-span-full bg-[#b98362] rounded-lg col-span-1 py-3 px-4
                  hover:bg-[#935027] hover:text-slate-100`,
                  step.page === page
                    ? "bg-[#5C3D2F] text-slate-100"
                    : "text-black"
                )}
              >
                {step.title}
              </Link>
              <Separator orientation="vertical" className="lg:block hidden" />
            </div>
          ))}
        </div>

        {/* Nội dung hiển thị component tương ứng */}
        <div className="lg:col-span-3 col-span-full border rounded-lg shadow-md">
          {currentStep?.component}
        </div>
      </div>
    </section>
  );
}