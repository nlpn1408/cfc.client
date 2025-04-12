import { UserPageProps } from "@/types/types";
import * as Tabs from "@radix-ui/react-tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Component } from "lucide-react";
import OrderItems from "./oder/oder-items";
import OrderDelivery from "./oder/order-delivery";
import OrderCancel from "./oder/order-cancel";
import OrderComplete from "./oder/order-complete";

export default function OrderPage({
  page,
  title,
  description,
  userId,
  formId,
}: UserPageProps) {
  const tabItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      ),
      name: "Chờ xác nhận",
      status:'pending',
      Component: <OrderItems />,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
      ),
      name: "Đang giao hàng",
      status:'shipping',
      Component: <OrderDelivery />,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
      name: "Đã hủy",
      status:'cancel',
      Component: <OrderCancel />,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
      status:'complete',
      name: "Đã giao hàng",
      Component: <OrderComplete />,
    },
  ];
  return (
    <Tabs.Root className="mx-auto px-4 md:px-8" defaultValue={tabItems[0].name}> 
      {/* Bọc Tabs trong Carousel */}
      <Carousel className="w-full">
        <CarouselContent className="flex w-full">
          {tabItems.map((item, idx) => (
            <CarouselItem key={idx} className="basis-1/3 md:basis-1/5">
              <Tabs.List
                className="flex gap-x-2 border-b text-xs md:text-sm whitespace-nowrap"
                aria-label="Manage your account"
              >
                <Tabs.Trigger
                  key={idx}
                  className="group px-3 py-2 border-b-2 border-transparent text-gray-500 
                  data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600"
                  value={item.name}
                >
                  <div
                    className="flex items-center gap-x-2 rounded-lg duration-150 
                  group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium"
                  >
                    {item.icon}
                    {item.name}
                  </div>
                </Tabs.Trigger>
              </Tabs.List>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Nội dung Tabs */}
      {tabItems.map((item, idx) => (
        <Tabs.Content key={idx} className="py-6" value={item.name} >
          <div className="text-xs md:text-sm leading-normal">
            {item.Component}{" "}
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
