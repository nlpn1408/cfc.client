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
      console.log("User Data:", userData); // ✅ Kiểm tra dữ liệu
      setUser(userData);

      Object.keys(userData).forEach((key) => {
        if (key in userData) {
          setValue(key as keyof UserProfile, userData[key as keyof UserProfile]);
        }
      });
    }
  }, [setValue]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string); // Preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET; // Get the preset from env
    if (!uploadPreset) {
      throw new Error("Cloudinary upload preset is missing");
    }

    formData.append("upload_preset", uploadPreset);  // Use the correct upload preset

    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error uploading image:", errorText);
      throw new Error("Image upload failed");
    }

    const data = await response.json();
    return data.secure_url;  // Return the secure URL of the uploaded image
  };

  async function onSubmit(data: UserProfile) {
    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const { email, imgUrl, ...postData } = data;

      let uploadedImageUrl = imgUrl;

      // Upload image if user selected a new avatar
      if (avatarFile) {
        uploadedImageUrl = await uploadAvatar(avatarFile); // Upload new avatar and get URL
      }

      // Send updated data to the server
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",  // Send cookies for auth
        body: JSON.stringify({ ...postData, imgUrl: uploadedImageUrl }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Update failed: " + errorText);
      }

      // Update user data in sessionStorage and local state
      const updatedUser = await response.json();
      setUser(updatedUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);
      toast.success("Your information has been updated!");
    } catch (error) {
      console.error("Error updating user info:", error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGenderChange = (gender: string, value: string) => {
    setValue("gender", value);
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
              src="/default-avatar.png"
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
              { value: "MALE", label: "Nam" },
              { value: "FEMALE", label: "Nữ" },
              { value: "OTHER", label: "Khác" },
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
        <div className="flex justify-center py-3">
          {isEditing ? (
            <SubmitButton title="Lưu thay đổi" isLoading={isLoading} loadingTitle="Đang lưu..." />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg col-span-full"
            >
              Chỉnh sửa
            </button>
          )}
        </div>
      </form>
    </div>

  );
}