'use client'

import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { ChangePasswordProps, UserPageProps } from '@/types/types';
import TextInput from '@/components/FromInput/TextInput';
import SubmitButton from '@/components/FromInput/SubmitButton';

export default function ChangePassword({ title, userId }: UserPageProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ChangePasswordProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const router = useRouter();
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  async function onSubmit(data: ChangePasswordProps) {
    if (!passwordMatch) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          password: data.password,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || 'Đổi mật khẩu thất bại');
      } else {
        toast.success('Đổi mật khẩu thành công!');
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || 'Lỗi không xác định');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {/* Tiêu đề */}
      <div className="text-center border-b pb-4">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>

      {/* Form đổi mật khẩu */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <TextInput
          label="Mật khẩu hiện tại"
          name="oldPassword"
          type="password"
          placeholder="********"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Mật khẩu mới"
          name="password"
          type="password"
          placeholder="********"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          type="password"
          placeholder="********"
          register={register}
          errors={errors}
        />
        {!passwordMatch && (
          <p className="text-sm text-red-500">Mật khẩu xác nhận không khớp</p>
        )}

        <SubmitButton
          title="Lưu mật khẩu"
          loadingTitle="Đang cập nhật..."
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}
