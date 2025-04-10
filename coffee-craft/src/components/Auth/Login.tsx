"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { LoginInputProps } from "@/types/types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiInformationCircle } from "react-icons/hi";
import TextInput from "../FromInput/TextInput";
import { Alert } from "flowbite-react";
import SubmitButton from "../FromInput/SubmitButton";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInputProps>();

  async function onSubmit(data: LoginInputProps) {
    try {
      setIsLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // 🔹 Gọi API login
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Quan trọng để gửi & nhận cookie
        body: JSON.stringify(data),
      });

      if (!loginResponse.ok) {
        const errorText = await loginResponse.text();
        let errorMessage = "Login failed";
        try {
          setIsLoading(true);
          const API_URL = process.env.NEXT_PUBLIC_API_URL;

          // 🔹 Gọi API login
          const loginResponse = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // ✅ Quan trọng để gửi & nhận cookie
            body: JSON.stringify(data),
          });

          if (!loginResponse.ok) {
            const errorText = await loginResponse.text();
            let errorMessage = "Login failed";
            try {
              const errorData = JSON.parse(errorText);
              errorMessage = errorData.message || errorMessage;
            } catch (e) {
              console.error("Error parsing login error response:", errorText);
            }
            throw new Error(errorMessage);
          }

          // 🔹 Gọi API /auth/me để lấy thông tin user
          const meResponse = await fetch(`${API_URL}/auth/me`, {
            method: "GET",
            credentials: "include", // ✅ Gửi cookie để backend xác thực
          });

          if (!meResponse.ok) {
            throw new Error("Failed to fetch user data");
          }

          const userData = await meResponse.json();

          // 🔹 Lưu thông tin user vào sessionStorage
          sessionStorage.setItem("user", JSON.stringify(userData));

          // 🔹 Gửi sự kiện để cập nhật user trên toàn ứng dụng
          window.dispatchEvent(new Event("userChanged"));

          toast.success("Login Successful");
          window.location.href = "/";
        } catch (error) {
          console.error("Login error:", error);
          toast.error(
            error instanceof Error
              ? error.message
              : "An unexpected error occurred"
          );
        } finally {
          setIsLoading(false);
        }
        throw new Error(errorMessage);
      }

      // 🔹 Gọi API /auth/me để lấy thông tin user
      const meResponse = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include", // ✅ Gửi cookie để backend xác thực
      });

      if (!meResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await meResponse.json();

      // 🔹 Lưu thông tin user vào sessionStorage
      sessionStorage.setItem("user", JSON.stringify(userData));

      // 🔹 Gửi sự kiện để cập nhật user trên toàn ứng dụng
      window.dispatchEvent(new Event("userChanged"));

      toast.success("Login Successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            method="POST"
          >
            {showNotification && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Sign-in error!</span> Please Check
                your credentials
              </Alert>
            )}
            <TextInput
              type="email"
              name="email"
              label="Email Address"
              register={register}
              errors={errors}
              placeholder="abc@xyz.com"
            />
            <TextInput
              type="password"
              name="password"
              label="Password"
              register={register}
              errors={errors}
              placeholder="********"
              page="login"
            />
            <SubmitButton
              title="Login"
              loadingTitle="Logging you please wait..."
              isLoading={isLoading}
            />
            {/* <Button variant="outline" className="w-full">
                            Login with Google
                        </Button> */}
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/hero/hero1.png"
          alt="Image"
          className="bg-center bg-no-repeat h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
