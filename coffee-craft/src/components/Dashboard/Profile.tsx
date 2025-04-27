"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import { UserProfile } from "@/types/types";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FromInput/TextInput";
import TextAreaInput from "@/components/FromInput/TextAreaInput";
import SelectionInput from "@/components/FromInput/SelectionInput";
import ImageInput from "@/components/FromInput/ImageInput";
import SubmitButton from "@/components/FromInput/SubmitButton";

export default function Profile({ title }: { title: string }) {
  const { id } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfile>();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData: UserProfile = JSON.parse(storedUser);
      setUser(userData);
      Object.entries(userData).forEach(([key, value]) => {
        setValue(key as keyof UserProfile, value);
      });
    }
  }, [setValue]);

  const handleGenderChange = (_: string, value: string) => {
    setValue("gender", value);
  };

  const resetFormState = () => {
    setIsEditing(false);
    setPreviewAvatar(null);
    setImageUrl(undefined);
  };

  const onSubmit = async (data: UserProfile) => {
    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const { email, imgUrl, ...putData } = data;
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...putData, imgUrl: imageUrl }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Cập nhật thành công");
        resetFormState();
        window.location.reload();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-center">{title}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} method="PUT" className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin cá nhân */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Họ và tên"
              name="name"
              placeholder="Nhập họ và tên"
              type="text"
              register={register}
              errors={errors}
              disabled={!isEditing}
              defaultValue={user?.name}
            />
            <TextInput
              label="Email"
              name="email"
              placeholder="john.doe@example.com"
              type="email"
              register={register}
              errors={errors}
              disabled
              defaultValue={user?.email}
            />
            <TextInput
              label="Số điện thoại"
              name="phone"
              placeholder="Nhập số điện thoại"
              type="tel"
              register={register}
              errors={errors}
              disabled={!isEditing}
              defaultValue={user?.phone}
            />
            <SelectionInput
              label="Giới tính"
              name="gender"
              placeholder="Chọn giới tính"
              options={[
                { label: "Nam", value: "MALE" },
                { label: "Nữ", value: "FEMALE" },
                { label: "Khác", value: "OTHER" },
              ]}
              register={register}
              setValue={handleGenderChange}
              disabled={!isEditing}
            />
            <TextAreaInput
              label="Địa chỉ"
              name="address"
              placeholder="Nhập địa chỉ"
              register={register}
              errors={errors}
              disabled={!isEditing}
              defaultValue={user?.address || ""}
              className="md:col-span-2"
            />
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={previewAvatar || user?.imgUrl || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
            />
            {isEditing && (
              <ImageInput
                label="Tải ảnh mới"
                endpoint="imageUploader"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            )}
          </div>
        </div>

        {/* Hành động */}
        <div className="flex justify-center gap-4">
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={resetFormState}
              >
                Huỷ
              </Button>
              <SubmitButton
                title="Lưu thay đổi"
                isLoading={isLoading}
                loadingTitle="Đang lưu..."
              />
            </>
          ) : (
            <Button className="text-base dark:text-white bg-[#935027] hover:bg-[#412017]" onClick={() => setIsEditing(true)}>Chỉnh sửa thông tin</Button>
          )}
        </div>
      </form>
    </div>
  );
}
