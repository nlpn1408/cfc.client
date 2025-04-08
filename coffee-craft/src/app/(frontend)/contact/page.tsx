"use client";
import Login from "@/components/Auth/Login";

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
import TextInput from "../../../components/FromInput/TextInput";
import SubmitButton from "../../../components/FromInput/SubmitButton";
import Register from "@/components/Auth/Register";
const description =
                      "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";
                    
           
                      

const contact = () =>{
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
        <div className="container">
            <div className="my-10 text-center space-y-5">
                <h1 className="text-5xl font-bold">Liên hệ</h1>
                <div className="mx-auto max-w-32 h-[0.25rem] bg-gray-300"></div>
                <h4 className="text-base ">Bất kỳ thắc mắc hay cần sự hỗ trợ, hãy liên hệ với Soul bằng <br/> cách tiện cho bạn nhất dưới đây:</h4>
            </div>
            <div className="flex justify-center my-10">
                <div className="flex">
                    <div className=" text-center space-y-5 max-w-96">
                        <div className="">
                            <img src="/contact/1-1-1024x1024.png" alt="" />
                        </div>
                        <div className= " mt-0 bg-gray-200 h-96 m-auto place-content-center">
                            <div className="flex justify-center"><svg className="opacity-25 p-auto w-20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="118.875px" height="122.877px" viewBox="0 0 118.875 122.877" enable-background="new 0 0 118.875 122.877" ><g><path fill-rule="evenodd" clip-rule="evenodd" d="M1.432,20.714c9.427,6.476,18.779,12.989,26.673,21.375 C23.58,62.076,41.64,78.045,58.111,87.453c6.448,3.683,9.298,6.265,16.476,5.024l28.268,27.696 C49.657,138.039-10.045,63.084,1.432,20.714L1.432,20.714z M81.874,85.356l6.201-6.298c1.788-1.819,4.74-1.842,6.559-0.053 l22.862,22.509c1.818,1.789,1.841,4.741,0.053,6.559l-6.203,6.299c-1.789,1.818-4.741,1.841-6.56,0.052L81.924,91.915 C80.105,90.127,80.083,87.175,81.874,85.356L81.874,85.356z M7.004,7.467l4.5-5.464c1.929-2.342,5.425-2.68,7.767-0.751 l23.405,19.281c2.342,1.931,2.677,5.425,0.75,7.77l-4.502,5.461c-1.93,2.345-5.425,2.68-7.768,0.751L7.755,15.234 C5.413,13.305,5.073,9.809,7.004,7.467L7.004,7.467z"/></g></svg>                        </div>
                            <h2 className="text-4xl font-bold my-4">Gọi ngay</h2>
                            <p>Hotline:</p>
                            <a href="">09091234567</a>
                        </div>
                    </div>
                    <div className=" text-center space-y-5 max-w-96">
                        <div className= " mt-0 bg-gray-200 h-96 m-auto place-content-center">
                            <div className="flex justify-center"><svg className="opacity-25 p-auto w-20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="118.875px" height="122.877px" viewBox="0 0 118.875 122.877" enable-background="new 0 0 118.875 122.877" ><g><path fill-rule="evenodd" clip-rule="evenodd" d="M1.432,20.714c9.427,6.476,18.779,12.989,26.673,21.375 C23.58,62.076,41.64,78.045,58.111,87.453c6.448,3.683,9.298,6.265,16.476,5.024l28.268,27.696 C49.657,138.039-10.045,63.084,1.432,20.714L1.432,20.714z M81.874,85.356l6.201-6.298c1.788-1.819,4.74-1.842,6.559-0.053 l22.862,22.509c1.818,1.789,1.841,4.741,0.053,6.559l-6.203,6.299c-1.789,1.818-4.741,1.841-6.56,0.052L81.924,91.915 C80.105,90.127,80.083,87.175,81.874,85.356L81.874,85.356z M7.004,7.467l4.5-5.464c1.929-2.342,5.425-2.68,7.767-0.751 l23.405,19.281c2.342,1.931,2.677,5.425,0.75,7.77l-4.502,5.461c-1.93,2.345-5.425,2.68-7.768,0.751L7.755,15.234 C5.413,13.305,5.073,9.809,7.004,7.467L7.004,7.467z"/></g></svg>                        </div>
                            <h2 className="text-4xl font-bold my-4">Gọi ngay</h2>
                            <p>Hotline:</p>
                            <a href="">09091234567</a>
                        </div>
                        <div className="">
                            <img src="/contact/2-1-1024x1024.png" alt="" />
                        </div>
                    </div>
                    <div className=" text-center space-y-5 max-w-96">
                        <div className="">
                            <img src="/contact/3-1.png" alt="" />
                        </div>
                        <div className= " mt-0 bg-gray-200 h-96 m-auto place-content-center">
                            <div className="flex justify-center"><svg className="opacity-25 p-auto w-20" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="118.875px" height="122.877px" viewBox="0 0 118.875 122.877" enable-background="new 0 0 118.875 122.877" ><g><path fill-rule="evenodd" clip-rule="evenodd" d="M1.432,20.714c9.427,6.476,18.779,12.989,26.673,21.375 C23.58,62.076,41.64,78.045,58.111,87.453c6.448,3.683,9.298,6.265,16.476,5.024l28.268,27.696 C49.657,138.039-10.045,63.084,1.432,20.714L1.432,20.714z M81.874,85.356l6.201-6.298c1.788-1.819,4.74-1.842,6.559-0.053 l22.862,22.509c1.818,1.789,1.841,4.741,0.053,6.559l-6.203,6.299c-1.789,1.818-4.741,1.841-6.56,0.052L81.924,91.915 C80.105,90.127,80.083,87.175,81.874,85.356L81.874,85.356z M7.004,7.467l4.5-5.464c1.929-2.342,5.425-2.68,7.767-0.751 l23.405,19.281c2.342,1.931,2.677,5.425,0.75,7.77l-4.502,5.461c-1.93,2.345-5.425,2.68-7.768,0.751L7.755,15.234 C5.413,13.305,5.073,9.809,7.004,7.467L7.004,7.467z"/></g></svg>                        </div>
                            <h2 className="text-4xl font-bold my-4">Gọi ngay</h2>
                            <p>Hotline:</p>
                            <a href="">09091234567</a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="">
                    {/* <div>dsfhasfye</div>
                    <div></div> */}
                    
                    
            <div className="bg-gray-300 p-2">        
                <div className="bg-white w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                    <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Register</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your information to create an account
                        </p>
                        </div>
                        <form
                        className="grid gap-4 "
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
                        <Button className="w-full">
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
            </div>      
                    
                </div>
            </div>
        </div>
    )
}

export default contact;