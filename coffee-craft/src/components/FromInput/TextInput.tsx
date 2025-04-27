import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { TextInputProps } from '@/types/types'

export default function TextInput({
    label,
    register,
    name,
    errors,
    type,
    placeholder,
    page,
    className = "col-span-full",
    isRequired = true,
    disabled,
    validateOptions
}: TextInputProps) {
    return (
        <div className={cn('grid gap-2', className)}>
            {type === 'password' && page === 'login' ? (
                <div className="flex items-center">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>
            ) : (
                <Label className='text-base' htmlFor={name}>
                    {label}
                </Label>
            )}

            <div className="mt-2">
                <Input
                    {...register(name, {
                        required: isRequired && `${label} is required`,
                        ...validateOptions, // ✅ điều kiện mở rộng
                    })}
                    id={name}
                    name={name}
                    type={type}
                    autoComplete="name"
                    disabled={disabled}
                    placeholder={placeholder}
                />
                {errors[name] && (
                    <span className='text-red-600 text-sm'>
                        {errors[name]?.message || `vui lòng không bỏ trống ${label}`}
                    </span>
                )}
            </div>
        </div>
    )
}
