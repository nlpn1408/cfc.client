"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/FromInput/TextInput";
import { AddressForm } from "@/types/types";
import TextAreaInput from "@/components/FromInput/TextAreaInput";

const AddAddress = () => {
  // Khởi tạo form với react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressForm>();

  // Xử lý khi submit form
  const onSubmit = (data: AddressForm) => {
    console.log("Dữ liệu được gửi:", data);
  };

  return (
    <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
        <h2 className="text-3xl font-semibold mb-6">Add Shipping Address</h2>
        <div className="grid grid-cols-2 gap-5 shadow-xl rounded-lg p-4">
          {/* Họ và tên */}
          <TextInput
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            register={register}
            errors={errors}
          />

          {/* Số điện thoại */}
          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type="text"
            placeholder="Enter your phone number"
            register={register}
            errors={errors}
          />

          {/* Địa chỉ */}
          <TextAreaInput
            label="Address (Area and Street)"
            name="area"
            type="text"
            placeholder="Enter your address"
            register={register}
            errors={errors}
          />

        </div>

        {/* Nút gửi */}
        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          Save Address
        </Button>
      </form>
      <img
        className="md:mr-16 mt-16 md:mt-0"
        src="/my_location_image.svg"
        alt="my_location_image"
      />
    </div>
  );
};

export default AddAddress;
