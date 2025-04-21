"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import TextInput from "@/components/FromInput/TextInput"
import { RegisterInputProps } from "@/types/types"
import SubmitButton from "@/components/FromInput/SubmitButton"
import { useState } from "react"
import { HiInformationCircle } from "react-icons/hi"
import { Alert } from "@/components/ui/alert"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterInputProps>();

    async function onSubmit(data: RegisterInputProps) {
        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${API_URL}/users`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const users = await res.json();

            // Tìm user có email khớp
            const matchedUser = users.find(
                (user: any) => user.email === data.email
            );

            if (matchedUser) {
                toast.success("Email hợp lệ. Đang chuyển hướng...");
                router.push(`/verify-account/${matchedUser.id}`);
            } else {
                toast.error("Email không tồn tại trong hệ thống.");
            }

        } catch (error) {
            toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
            console.error("Error fetching users:", error);
        }
    }

    return (
        <div className="container lg:px-16 md:px-8 px-4 mt-10 flex items-center flex-col h-full ">
            <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-md">
                <Link href='/login'><ArrowLeft size={25} className="text-orange-700 hover:text-orange-500" /></Link>
                <div>
                    <h1 className="col-span-full font-bold text-3xl text-center">Quên mật khẩu</h1>
                    <form
                        className=" grid gap-4 mx-auto"
                        onSubmit={handleSubmit(onSubmit)}
                        action="#"
                    >
                        <TextInput
                            type="email"
                            name="email"
                            label="Email Address"
                            register={register}
                            errors={errors}
                            placeholder="abc@xyz.com"
                        />
                        <SubmitButton
                            title="Tiếp tục"
                            loadingTitle="Vui lòng chờ..."
                            isLoading={isLoading}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
