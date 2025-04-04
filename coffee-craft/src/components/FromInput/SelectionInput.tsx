"use client";

import { SelectionInputProps } from "@/types/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SelectionInput({
    label,
    register,
    name,
    className = "sm:col-span-2",
    options = [],
    placeholder,
    setValue,
    disabled,
}: SelectionInputProps) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-base font-semibold leading-6 text-gray-900 dark:text-slate-50 mb-3">
                {label}
            </label>
            <div className="mt-2 border border-slate-400 rounded-md">
                <Select
                    onValueChange={(value) => setValue(name, value)} // Cập nhật giá trị khi chọn
                    disabled={disabled}
                >
                    <SelectTrigger className="w-full text-slate-700 hover:bg-white mt-0">
                        <SelectValue placeholder={placeholder}/>
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option, i) => (
                            <SelectItem key={i} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}