"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import TextInput from "../FromInput/TextInput";
import TextAreaInput from "../FromInput/TextAreaInput";
import SubmitButton from "../FromInput/SubmitButton";
import SelectionInput from "../FromInput/SelectionInput";
import ImageInput from "../FromInput/ImageInput";

import { UserProfile } from "@/types/types";
import { Button } from "../ui/button";

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

  // Lấy user từ sessionStorage
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
        toast.success("Cập nhật thành công");
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        resetFormState();
        window.location.reload();
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      toast.error("Cập nhật thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormState = () => {
    setIsEditing(false);
    setPreviewAvatar(null);
    setImageUrl(undefined);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center pt-2">
        Thông tin cá nhân
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5" method="PUT">
        <div className="grid grid-cols-3 gap-6">
          {/* Form thông tin người dùng */}
          <div className="col-span-2 grid grid-cols-2 gap-4 items-center">
            <TextInput
              label="Họ và tên"
              name="name"
              type="text"
              placeholder="Nhập họ và tên"
              register={register}
              className="md:col-span-1 col-span-full "
              errors={errors}
              disabled={!isEditing}
              defaultValue={user?.name}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              className="md:col-span-1 col-span-full"
              placeholder="Ex: john.doe@example.com"
              register={register}
              errors={errors}
              disabled={!isEditing}
              defaultValue={user?.email}
            />
            <TextInput
              label="Số điện thoại"
              name="phone"
              type="tel"
              className="md:col-span-1 col-span-full"
              placeholder="Nhập số điện thoại"
              register={register}
              errors={errors}
              disabled={!isEditing}
              defaultValue={user?.phone}
            />
            <SelectionInput
              label="Giới tính"
              placeholder="Chọn giới tính"
              name="gender"
              className="md:col-span-1 col-span-full"
              options={[
                { value: "MALE", label: "Nam" },
                { value: "FEMALE", label: "Nữ" },
                { value: "OTHER", label: "Khác" },
              ]}
              register={register}
              setValue={handleGenderChange}
              disabled={!isEditing}
            />
            <TextAreaInput
              label="Địa chỉ"
              name="address"
              placeholder="Chưa có địa chỉ"
              register={register}
              errors={errors}
              disabled={!isEditing}
              defaultValue={user?.address ?? ""}
            />
          </div>
          {/* Ảnh đại diện */}
          <div className="col-span-1 py-5">
            <img
              src={previewAvatar || user?.imgUrl || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
            />

            {isEditing && (
              <ImageInput
                label="Upload Image"
                className="col-span-full md:col-span-2 lg:col-span-2"
                endpoint="imageUploader"
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
              />
            )}
          </div>
        </div>
        {/* Nút lưu thay đổi */}
        <div className="grid grid-cols-2 gap-3 my-3">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-3 col-span-full">
              <Button
                type="button"
                onClick={resetFormState}
                className="bg-white text-red-600 hover:bg-red-700 shadow-md  hover:text-white px-6 py-3 rounded-lg text-lg"
              >
                Huỷ
              </Button>
              <SubmitButton
                title="Lưu thay đổi"
                className="col-span-1"
                isLoading={isLoading}
                loadingTitle="Đang lưu..."
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-[#723E1E] hover:bg-[#935027] text-white px-6 py-3 rounded-lg text-lg"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
