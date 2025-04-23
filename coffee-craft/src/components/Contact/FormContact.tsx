"use client";
import { ContactFormProps } from "@/types/types";
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../FromInput/TextInput";
import TextAreaInput from "../FromInput/TextAreaInput";
import SubmitButton from "../FromInput/SubmitButton";
import Image from "next/image";
import toast from "react-hot-toast";

export default function FormContact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormProps>();

  async function onSubmit(data: ContactFormProps) {
    try {
      const Api_Contact = process.env.NEXT_PUBLIC_API_CONTACT;
      const response = await fetch(`${Api_Contact}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Gửi yêu cầu liên hệ thành công");
        reset();
      } else {
        toast.error("Gửi yêu cầu liên hệ thất bại");
      }
      reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Lỗi không liện hệ không được gửi");
    }
  }

  return (
    <section className="background_url bg-cover bg-center bg-no-repeat md:p-20 mt-5">
      <div className="container px-4 md:px-8 lg:px-16">
        <div className="container max-w-screen-2xl grid grid-cols-1 md:grid-cols-2 bg-white items-center gap-4 lg:p-10 md:p-5">
          <img
            src="/contact/bgContact.jpg"
            alt=""
            className="w-full col-span-full lg:col-span-1 object-cover"
          />
          <div className="lg:p-10 flex flex-col justify-center gap-5 lg:col-span-1 col-span-full ">
            <h1 className="text-center text-3xl lg:text-5xl font-extrabold">
              Liên hệ / Hợp tác
            </h1>
            <p className="text-center text-sm lg:text-md">
              Thông tin sẽ được gửi trực tiếp đến bộ phận CSKH của CoffeeCraft
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 px-3">
              <TextInput
                label="Họ và tên"
                name="name"
                type="text"
                placeholder="Nhập họ và tên"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Ex: john.doe@example.com"
                register={register}
                errors={errors}
              />
              <TextInput
                label="Số điện thoại"
                name="phone"
                type="tel"
                placeholder="Nhập số điện thoại"
                register={register}
                errors={errors}
              />
              <TextAreaInput
                label="Nội dung"
                name="message"
                placeholder="Nhập nội dung"
                register={register}
                errors={errors}
              />
              <SubmitButton
                title="Gửi"
                loadingTitle="Đang gửi..."
                buttonType="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
