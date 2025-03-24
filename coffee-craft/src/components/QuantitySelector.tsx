"use client";
import React,{ useState } from "react";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <button onClick={decrease} className="bg-gray-200 text-gray-800 p-1 px-3 rounded-md hover:bg-gray-400">
        -
      </button>
      <span className="text-lg font-semibold px-3">{quantity}</span>
      <button onClick={increase} className="bg-gray-200 text-gray-800 p-1 px-3 rounded-md hover:bg-gray-400">
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
