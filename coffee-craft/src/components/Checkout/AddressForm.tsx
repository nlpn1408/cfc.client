// components/Checkout/AddressForm.tsx
import React, { useEffect, useState } from 'react';

type UserInfo = {
  fullName: string;
  phone: string;
  email: string;
};

type AddressFormProps = {
  user: UserInfo;
  onAddressChange: (data: any) => void;
};

const AddressForm = ({ user, onAddressChange }: AddressFormProps) => {
  const [address, setAddress] = useState({
    province: '',
    district: '',
    ward: '',
    street: '',
    note: '',
    invoice: false
  });

  useEffect(() => {
    onAddressChange(address);
  }, [address, onAddressChange]);

  return (
    <div className="p-4 border rounded-lg bg-white w-full">
      <h1 className="text-3xl font-semibold text-gray-800 mb-10">Địa Chỉ Nhận Hàng</h1>

      <div className="grid grid-cols-2 gap-4">
        <input disabled value={user.fullName} className="border p-2 rounded-md bg-gray-100" />
        <input disabled value={user.phone} className="border p-2 rounded-md bg-gray-100" />
        <input disabled value={user.email} className="border p-2 rounded-md bg-gray-100" />

        <select
          className="border p-2 rounded-md"
          value={address.province}
          onChange={(e) => setAddress({ ...address, province: e.target.value })}
        >
          <option value="">Chọn Tỉnh/TP *</option>
          <option>Hà Nội</option>
          <option>TP.HCM</option>
        </select>
        <select
          className="border p-2 rounded-md"
          value={address.district}
          onChange={(e) => setAddress({ ...address, district: e.target.value })}
        >
          <option value="">Chọn Quận/Huyện *</option>
          <option>Quận 1</option>
          <option>Quận 2</option>
        </select>
        <select
          className="border p-2 rounded-md"
          value={address.ward}
          onChange={(e) => setAddress({ ...address, ward: e.target.value })}
        >
          <option value="">Chọn Phường/Xã *</option>
          <option>Phường A</option>
          <option>Phường B</option>
        </select>
        <input
          placeholder="Số nhà/Tên đường *"
          className="border p-2 rounded-md col-span-2"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
        />
        <textarea
          placeholder="Ghi chú đơn hàng"
          className="border p-2 rounded-md col-span-2"
          value={address.note}
          onChange={(e) => setAddress({ ...address, note: e.target.value })}
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={address.invoice}
          onChange={(e) => setAddress({ ...address, invoice: e.target.checked })}
        />
        <label>Yêu cầu xuất hoá đơn GTGT cho đơn hàng này</label>
      </div>
    </div>
  );
};

export default AddressForm;
