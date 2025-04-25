"use client";
import React, { useEffect, useState } from "react";

type Props = {
  user: { name: string; phone: string; email: string };
  onChange: (val: any) => void;
};

const AddressForm = ({ user, onChange }: Props) => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const [data, setData] = useState({
    street: "",
    note: "",
  });

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((res) => res.json())
        .then((data) => setDistricts(data.districts));
    } else {
      setDistricts([]);
      setWards([]);
      setSelectedDistrict("");
      setSelectedWard("");
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((res) => res.json())
        .then((data) => setWards(data.wards));
    } else {
      setWards([]);
      setSelectedWard("");
    }
  }, [selectedDistrict]);

  useEffect(() => {
    onChange({
      ...data,
      province:
        provinces.find((p) => p.code === Number(selectedProvince))?.name || "",
      district:
        districts.find((d) => d.code === Number(selectedDistrict))?.name || "",
      ward: wards.find((w) => w.code === Number(selectedWard))?.name || "",
    });
  }, [data, selectedProvince, selectedDistrict, selectedWard]);

  return (
    <div className="bg-white space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Địa chỉ giao hàng</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Họ tên người nhận
          </label>
          <input
            disabled
            value={user.name}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            disabled
            value={user.phone}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700"
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            disabled
            value={user.email}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-700"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Tỉnh / Thành phố
          </label>
          <select
            className="px-4 py-2 rounded-md border border-gray-300"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">Chọn Tỉnh / Thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.code}>
                {province.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Quận / Huyện
          </label>
          <select
            className="px-4 py-2 rounded-md border border-gray-300"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedProvince}
          >
            <option value="">Chọn Quận / Huyện</option>
            {districts.map((district) => (
              <option key={district.code} value={district.code}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Phường / Xã
          </label>
          <select
            className="px-4 py-2 rounded-md border border-gray-300"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            disabled={!selectedDistrict}
          >
            <option value="">Chọn Phường / Xã</option>
            {wards.map((ward) => (
              <option key={ward.code} value={ward.code}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Số nhà, tên đường
          </label>
          <input
            placeholder="Số nhà, tên đường"
            className="px-4 py-2 rounded-md border border-gray-300"
            value={data.street}
            onChange={(e) => setData({ ...data, street: e.target.value })}
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <textarea
            placeholder="Ghi chú"
            className="px-4 py-2 rounded-md border border-gray-300 min-h-[100px]"
            value={data.note}
            onChange={(e) => setData({ ...data, note: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
