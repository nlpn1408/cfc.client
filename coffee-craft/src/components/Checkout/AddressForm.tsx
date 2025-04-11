"use client";
import React, { useEffect, useState } from "react";

type Props = {
  user: { name: string; phone: string; email: string };
  onChange: (val: any) => void;
};

const AddressForm = ({ user, onChange }: Props) => {
  const [data, setData] = useState({
    street: "",
    ward: "",
    district: "",
    province: "",
    note: "",
  });

  useEffect(() => {
    onChange(data);
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Địa chỉ giao hàng</h2>
      <div className="grid grid-cols-2 gap-4">
        <input disabled value={user.name} className="input disabled" />
        <input disabled value={user.phone} className="input disabled" />
        <input disabled value={user.email} className="input disabled col-span-2" />
        <input placeholder="Tỉnh/Thành phố" className="input" value={data.province} onChange={(e) => setData({ ...data, province: e.target.value })} />
        <input placeholder="Quận/Huyện" className="input" value={data.district} onChange={(e) => setData({ ...data, district: e.target.value })} />
        <input placeholder="Phường/Xã" className="input" value={data.ward} onChange={(e) => setData({ ...data, ward: e.target.value })} />
        <input placeholder="Số nhà, tên đường" className="input col-span-2" value={data.street} onChange={(e) => setData({ ...data, street: e.target.value })} />
        <textarea placeholder="Ghi chú" className="input col-span-2" value={data.note} onChange={(e) => setData({ ...data, note: e.target.value })} />
      </div>
    </div>
  );
};

export default AddressForm;
