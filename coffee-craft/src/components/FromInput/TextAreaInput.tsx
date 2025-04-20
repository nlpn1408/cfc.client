import React from 'react'
import { Textarea } from '../ui/textarea'
import { cn } from '@/lib/utils'
import { TextAreaInputProps } from '@/types/types'


export default function TextAreaInput({
    label,
    register,
    name,
    errors,
    type = "text",
    placeholder,
    className = "col-span-full",
    disabled
}: TextAreaInputProps
) {
    return (
        <div className={cn("grid gap-2", className)}>
            <label htmlFor={`${name}`}>{label}</label>
            <Textarea
                {...register(`${name}`, { required: true })}
                id={`${name}`}
                name={`${name}`}
                type={type}
                disabled={disabled}
                placeholder={`${placeholder}`}
            />
            {errors[`${name}`] && (
                <span className='text-red-600 text-sm'>vui lòng không bỏ trống {label}</span>
            )}
        </div>
    )
}
