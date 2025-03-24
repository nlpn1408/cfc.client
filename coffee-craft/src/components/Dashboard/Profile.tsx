"use client";
import { useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "user@gmail.com",
    phone: "0123456789",
    address: "123 Đường ABC, TP. Hồ Chí Minh",
    avatar: "https://i.pravatar.cc/150?img=5", // Avatar URL
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setUser({ ...user, avatar: imageUrl });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Thông tin đã được cập nhật!");
  };

  return (
    <div className="flex ">
      {/* Nội dung chính */}
      <main className="w-full flex justify-center items-center">
        <div className="bg-white  rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Thông tin cá nhân
          </h2>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-gray-300 object-cover"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-3 text-sm text-gray-600"
              />
            )}
          </div>

          {/* Form thông tin người dùng */}
          <div className="space-y-4">
            {/* Họ và tên */}
            <div>
              <label className="block text-lg font-medium text-gray-600">
                Họ và Tên
              </label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg text-lg ${
                  isEditing ? "border-blue-500" : "bg-gray-200"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg text-lg ${
                  isEditing ? "border-blue-500" : "bg-gray-200"
                }`}
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-lg font-medium text-gray-600">
                Số điện thoại
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg text-lg ${
                  isEditing ? "border-blue-500" : "bg-gray-200"
                }`}
              />
            </div>

            {/* Địa chỉ */}
            <div>
              <label className="block text-lg font-medium text-gray-600">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-3 border rounded-lg text-lg ${
                  isEditing ? "border-blue-500" : "bg-gray-200"
                }`}
              />
            </div>
          </div>

          {/* Nút chỉnh sửa / lưu */}
          <div className="mt-8 flex justify-center">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg"
              >
                Lưu
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg"
              >
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
