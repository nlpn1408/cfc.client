"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


type SelectionInputProps = {
    label: string
    register: any
    className: string
    name: string
    options: SelectedProps[]
    multiple?: boolean
    OptionTitle?: string
    setValue?: any
}
type SelectedProps = {
    label: string
    value: string
}

export default function SelectionInput({
    label,
    register,
    name,
    className = "sm:col-span-2",
    options = [],
    multiple = false,
    OptionTitle = "Select an option",
}: SelectionInputProps
) {
    return (
        <div className={className}>
            <label
                htmlFor={name}
                className="block text-sm font-semibold leading-6 text-gray-900 dark:text-slate-50 mb-2"
            >
                {label}
            </label>
            <div className="mt-2">
                <Select
                    {...register(name)}
                    name={name}
                    id={name}
                    multiple={multiple}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder={OptionTitle} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option, i: number) => {
                            return (
                                <SelectItem key={i} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
