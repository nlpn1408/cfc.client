"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const [data, setData] = useState({ street: "", note: "" });

  // Fetch danh sách tỉnh
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  // Fetch quận khi chọn tỉnh
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

  // Fetch phường khi chọn quận
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

  // Trigger callback khi dữ liệu địa chỉ thay đổi
  useEffect(() => {
    onChange({
      ...data,
      province: provinces.find((p) => p.code === Number(selectedProvince))?.name || "",
      district: districts.find((d) => d.code === Number(selectedDistrict))?.name || "",
      ward: wards.find((w) => w.code === Number(selectedWard))?.name || "",
    });
  }, [data, selectedProvince, selectedDistrict, selectedWard]);

  return (
    <div className="p-4 space-y-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold ">Địa chỉ giao hàng</h2>

      <div className="grid grid-cols-2 gap-4 ">
        {/* Thông tin người nhận */}
        <div className="space-y-1">
          <Label htmlFor="name">Họ tên người nhận</Label>
          <Input className="border dark:border-slate-100" id="name" disabled value={user.name} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input className="border dark:border-slate-100" id="phone" disabled value={user.phone} />
        </div>

        <div className="space-y-1 col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input className="border dark:border-slate-100" id="email" disabled value={user.email} />
        </div>

        {/* Chọn tỉnh/thành phố */}
        <div className="space-y-1">
          <Label>Tỉnh / Thành phố</Label>
          <Select  value={selectedProvince} onValueChange={setSelectedProvince}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn Tỉnh / Thành phố" />
            </SelectTrigger>
            <SelectContent >
              {provinces.map((p) => (
                <SelectItem key={p.code} value={String(p.code)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chọn quận/huyện */}
        <div className="space-y-1">
          <Label>Quận / Huyện</Label>
          <Select
            value={selectedDistrict}
            onValueChange={setSelectedDistrict}
            disabled={!selectedProvince}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn Quận / Huyện" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((d) => (
                <SelectItem key={d.code} value={String(d.code)}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chọn phường/xã */}
        <div className="space-y-1 col-span-2">
          <Label>Phường / Xã</Label>
          <Select
            value={selectedWard}
            onValueChange={setSelectedWard}
            disabled={!selectedDistrict}
          >
            <SelectTrigger>
              <SelectValue placeholder="Chọn Phường / Xã" />
            </SelectTrigger>
            <SelectContent>
              {wards.map((w) => (
                <SelectItem key={w.code} value={String(w.code)}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Số nhà, tên đường */}
        <div className="space-y-1 col-span-2">
          <Label htmlFor="street">Số nhà, tên đường</Label>
          <Input className="border dark:border-slate-100"
            id="street"
            placeholder="Số nhà, tên đường"
            value={data.street}
            onChange={(e) => setData({ ...data, street: e.target.value })}
          />
        </div>

        {/* Ghi chú */}
        <div className="space-y-1 col-span-2">
          <Label htmlFor="note">Ghi chú</Label>
          <Textarea
            id="note"
            placeholder="Ghi chú"
            value={data.note}
            onChange={(e) => setData({ ...data, note: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
