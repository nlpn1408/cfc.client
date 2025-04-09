// components/Checkout/SubmitBar.tsx
import React from 'react';

const SubmitBar = () => {
  return (
    <div className="bg-black text-white text-center py-4 rounded-b-lg mt-4 cursor-pointer hover:bg-gray-900">
      <button className="text-lg font-bold justify-center items-center gap-2">
        THANH TOÁN <span>➤</span>
      </button>
    </div>
  );
};

export default SubmitBar;
