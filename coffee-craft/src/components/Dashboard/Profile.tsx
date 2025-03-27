"use client";
import { useState, useEffect } from "react";
import TextInput from "../FromInput/TextInput";
import { UserProfile } from "@/types/types";
import { useForm } from "react-hook-form";
import TextAreaInput from "../FromInput/TextAreaInput";
import SubmitButton from "../FromInput/SubmitButton";
import toast from "react-hot-toast";
import SelectionInput from "../FromInput/SelectionInput";
import { useParams } from "next/navigation";

export default function Profile({ title }: { title: string }) {
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfile>();

  // Lấy dữ liệu từ sessionStorage khi component mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const userData: UserProfile = JSON.parse(storedUser);
      setUser(userData);
      Object.keys(userData).forEach((key) => {
        if (key in userData) {
          setValue(key as keyof UserProfile, userData[key as keyof UserProfile]);
        }
      });
    }
  }, [setValue]);

  // Xử lý khi chọn ảnh đại diện
  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  }

  async function onSubmit(data: UserProfile) {
    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log("API URL:", API_URL);
      console.log("ID gửi đi:", id);
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Cập nhật thất bại");

      // Cập nhật lại state và sessionStorage
      setUser(data);
      sessionStorage.setItem("userProfile", JSON.stringify(data));
      setIsEditing(false);
      toast.success("Thông tin đã được cập nhật!");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
    setIsLoading(false);
  }

  const handleGenderChange = (gender: string, value: string) => {
    setValue('gender', value);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold text-center pt-2">Thông tin cá nhân</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5" method="PUT">
        <div className=" py-5">
          {(previewAvatar || user?.imgUrl) ? (
            <img
              src={previewAvatar || user?.imgUrl}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
            />
          ) : (
            <img
              src="/vercel.svg"
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover" />
          )}
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              placeholder="Chọn ảnh đại diện"
              name="imgUrl"
              className="mt-3 text-sm text-gray-600"
              onChange={handleAvatarChange}
            />
          )}
        </div>
        {/* Form thông tin người dùng */}
        <div className="grid grid-cols-2 gap-4  items-center">
          <TextInput
            label="Họ và tên"
            name="name"
            type="text"
            placeholder="Nhập họ và tên"
            register={register}
            errors={errors}
            disabled={!isEditing}
            defaultValue={user?.name}
            className="col-span-1"
          />
          <TextInput
            label="Email"
            name="email"
            type="email"
            placeholder="Ex: john.doe@example.com"
            register={register}
            errors={errors}
            disabled={!isEditing}
            defaultValue={user?.email}
            className="col-span-1"
          />
          <TextInput
            label="Số điện thoại"
            name="phone"
            type="tel"
            placeholder="Nhập số điện thoại"
            register={register}
            errors={errors}
            disabled={!isEditing}
            defaultValue={user?.phone}
            className="col-span-1"
          />
          <SelectionInput
            label="Giới tính"
            placeholder="Chọn giới tính"
            name="gender"
            options={[
              { value: "Male", gender: "Nam" },
              { value: "Female", gender: "Nữ" },
              { value: "Other", gender: "Khác" },
            ]}
            register={register}
            setValue={handleGenderChange}
            disabled={!isEditing}
            className="col-span-1"
          />


          <TextAreaInput
            label="Địa chỉ"
            name="address"
            placeholder="Chưa có địa chỉ"
            register={register}
            errors={errors}
            disabled={!isEditing}
            defaultValue={user?.address ?? "Chưa có địa chỉ"}
          />
        </div>

        <div className="flex justify-center pb-3">
          {isEditing ? (
            <SubmitButton title="Lưu thay đổi" isLoading={isLoading} loadingTitle="Đang lưu..." />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </form>
    </div>

  );
}