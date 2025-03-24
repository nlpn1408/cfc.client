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
      const response = await fetch("http://localhost:5555/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
          >
            {showNotification && (
              <Alert color="failure" icon={HiInformationCircle}>
                <span className="font-medium">Sign-in error!</span> Please Check
                your credentials
              </Alert>
            )}

            <TextInput
              label="Full Name"
              register={register}
              name="fullName"
              type="text"
              errors={errors}
              placeholder="Nguyen Van A"
            />

            <TextInput
              label="Phone Number"
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
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="********"
            />
            {!passwordMatch && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
            <TextInput
              label="Confirm Password"
              register={register}
              name="confirmPassword"
              type="password"
              errors={errors}
              placeholder="********"
            />
            <SubmitButton
              title="Create an account"
              isLoading={isLoading}
              loadingTitle="Creating an account please wait ..."
            />
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/hero/hero1.png"
          alt="Image"
          width="1170"
          height="850"
          className=" w-full h-screen object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
