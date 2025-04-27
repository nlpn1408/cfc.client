"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import OrderPage from "./Orderpage";

export default function UserProfile() {
  const router = useRouter();
  const params = useSearchParams();
  const userParams = useParams();
  const page = params.get("page") ?? "profile";
  const userId = userParams.id?.toString();
  const [user, setUser] = useState<any>(null);

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
        userId={userId}/>
      ),
    },
    {
      title: "Lịch sử đơn hàng",
      page: "order",
      component: (
        <OrderPage title="Lịch sử đơn hàng" page="order"   />
      ),
    },
  ];

  const currentStep = steps.find((step) => step.page === page);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <section className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Header trang */}
        <div className="col-span-full bg-muted rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-2">Trang cá nhân</h1>
          <div className="text-sm text-muted-foreground space-x-1">
            <span onClick={() => router.push("/")} className="cursor-pointer hover:underline">Trang chủ</span>/
            <span className="cursor-default">Bảng điều khiển</span>
          </div>
        </div>

        {/* Sidebar - Thanh điều hướng */}
        <aside className="lg:col-span-1 bg-background rounded-xl border p-5 space-y-6">
          {/* Thông tin người dùng */}
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14">
              <AvatarImage src={user?.imgUrl || "/default-avatar.png"} alt="Avatar" />
              <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold">{user?.name || "Khách"}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>

          <Separator />

          {/* Các bước điều hướng */}
          <nav className="flex flex-col space-y-2">
            {steps.map((step, index) => (
              <Link
                key={index}
                href={`/dashboard/${userId}?page=${step.page}`}
                className={cn(
                  "text-sm font-medium rounded-lg px-4 py-3 transition",
                  page === step.page
                    ? "bg-[#935027] text-primary-foreground"
                    : "hover:bg-[#412017] hover:text-secondary-foreground hover:text-white "
                )}
              >
                {step.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Nội dung chính */}
        <main className="lg:col-span-3 bg-background rounded-xl border py-6 shadow-sm">
          {currentStep?.component}
        </main>
      </div>
    </section>
  );
}
