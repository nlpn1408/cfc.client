"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import React from "react"
import { useRouter } from "next/navigation"
import { LoginInputProps } from "@/types/types"
import { signIn } from "next-auth/react"
import { useForm } from 'react-hook-form'
import toast from "react-hot-toast"
import { HiInformationCircle } from "react-icons/hi"
import Image from "next/image"
import TextInput from "../FromInput/TextInput"
import { Alert } from "flowbite-react"
import SubmitButton from "../FromInput/SubmitButton"


export const description =
    "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account."

export default function Login() {

    const [isLoading, setIsLoading] = React.useState(false)
    const [showNotification, setShowNotification] = React.useState(false)
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<LoginInputProps>()
    async function onSubmit(data: LoginInputProps) {
        // try {
        //     setIsLoading(true);
        //     console.log("Attempting to sign in with credentials:", data);
        //     const loginData = await signIn("credentials", {
        //         ...data,
        //         redirect: false,
        //     });
        //     console.log("SignIn response:", loginData);
        //     if (loginData?.error) {
        //         setIsLoading(false);
        //         toast.error("Sign-in error: Check your credentials");
        //         setShowNotification(true);
        //     } else {
        //         // Sign-in was successful
        //         setShowNotification(false);
        //         reset();
        //         setIsLoading(false);
        //         toast.success("Login Successful");
        //         router.push("/");
        //     }
        // } catch (error) {
        //     setIsLoading(false);
        //     console.error("Network Error:", error);
        //     toast.error("Its seems something is wrong with your Network");
        // }
        console.log(data);
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
                    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} action="#" method="POST">
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
    )
}