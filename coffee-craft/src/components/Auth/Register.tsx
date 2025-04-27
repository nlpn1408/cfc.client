"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Image from "next/image";
import { RegisterInputProps } from "@/types/types";
import TextInput from "../FromInput/TextInput";
import SubmitButton from "../FromInput/SubmitButton";
// import { createUser } from "@/actions/users"

export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default function Register() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showNotification, setShowNotification] = React.useState(false);
    const [passwordMatch, setPasswordMatch] = React.useState(true);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<RegisterInputProps>();

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    React.useEffect(() => {
        setPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    async function onSubmit(data: RegisterInputProps) {
        setIsLoading(true);

        if (!passwordMatch) {
            toast.error("Passwords do not match!");
            setIsLoading(false);
            return;
        }

        try {
            const API_URL = process.env.NEXT_PUBLIC_API_URL;

            const { confirmPassword, ...postData } = data;

            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("User created successfully");
                reset();
                router.push(`/login`);
            } else {
                toast.error(result.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }



    return (
        <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Đăng ký</h1>
                        <p className="text-balance text-muted-foreground">
                            Nhập thông tin của bạn để tạo tài khoản
                        </p>
                    </div>
                    <form
                        className="grid gap-4"
                        onSubmit={handleSubmit(onSubmit)}
                        method="POST"
                    >
                        {showNotification && (
                            <Alert color="failure" icon={HiInformationCircle}>
                                <span className="font-medium">Lỗi đăng kí!</span>Vui lòng kiểm tra
                                Thông tin đăng ký của bạn
                            </Alert>
                        )}

                        <TextInput
                            label="Họ và tên"
                            register={register}
                            name="name"
                            type="text"
                            errors={errors}
                            placeholder="Nguyen Van A"
                        />

                        <TextInput
                            label="Số điện thoại"
                            register={register}
                            name="phone"
                            type="tel"
                            errors={errors}
                            placeholder="0123456789"
                        />

                        <TextInput
                            label="Email"
                            register={register}
                            name="email"
                            type="email"
                            errors={errors}
                            placeholder="abc@def.xyz"
                        />

                        <TextInput
                            label="Mật khẩu"
                            register={register}
                            name="password"
                            type="password"
                            errors={errors}
                            placeholder="********"
                            validateOptions={{
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }}
                        />

                        {!passwordMatch && (
                            <p className="text-red-500 text-sm">Không trùng mật khẩu đã nhập</p>
                        )}
                        <TextInput
                            label="Nhập lại mật khẩu"
                            register={register}
                            name="confirmPassword"
                            type="password"
                            errors={errors}
                            placeholder="********"
                        />
                        <SubmitButton
                            title="Đăng ký tài khoản"
                            isLoading={isLoading}
                            loadingTitle="Đang đăng ký vui lòng chờ..."
                        />
                        <Button variant="outline" className="w-full">
                            Đăng nhập bằng Google
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Bạn đã có tài khoản? {" "}
                        <Link href="/login" className="underline">
                            Đăng nhập ngay
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block">
                <img
                    src="/hero/hero1.png"
                    alt="Image"
                    width="1170"
                    height="900"
                    className=" w-full h-screen object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
