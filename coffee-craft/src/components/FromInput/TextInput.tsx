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
    className ="col-span-full",
    isRequired=true
}: TextInputProps) {
    return (
        <div className={cn('grid gap-2',className)}>
            {type === 'password' && page === 'login'
                ? (
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                ) : (
                    <Label className='text-base' htmlFor={`${name}`} >
                        {label}
                    </Label>
                )}

            <div className="mt-2">
                <Input
                    {...register(`${name}`, { required: isRequired })}
                    id={`${name}`}
                    name={`${name}`}
                    type={type}
                    autoComplete="name"
                    placeholder={`${placeholder}`}
                />
                {errors[`${name}`]&& isRequired && (
                    <span className='text-red-600 text-sm'>{label} is required</span>
                )}
            </div>
        </div>

    )
}
