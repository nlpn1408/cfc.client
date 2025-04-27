import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
    title: string;
    buttonType?: "submit" | "button" | "reset" | undefined;
    isLoading?: boolean;
    loadingTitle?: string;
    className?: string;
};

export default function SubmitButton({
    title,
    buttonType = "submit",
    isLoading = false,
    loadingTitle = "Loading...",
    className,
}: SubmitButtonProps) {
    return (
        <div className={cn("w-full col-span-full", className)}>
            {isLoading ? (
                <Button
                    disabled
                    className="w-full text-base dark:text-white bg-[#935027] hover:bg-[#412017]"
                >
                    <Loader2 className="animate-spin h-5 w-5 mr-3" />
                    {loadingTitle}
                </Button>
            ) : (
                <Button
                    type={buttonType}
                    className="w-full text-base dark:text-white bg-[#935027] hover:bg-[#412017]"
                >
                    {title}
                </Button>
            )}
        </div>
    );
}
