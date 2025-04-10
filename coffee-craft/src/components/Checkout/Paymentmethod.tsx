// components/Checkout/PaymentMethod.tsx
type Props = {
  selected: string;
  onChange: (value: string) => void;
};

const PaymentMethod = ({ selected, onChange }: Props) => {
  return (
    <div className="p-4 border rounded-lg bg-white w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Phương thức thanh toán</h2>
      <div className="space-y-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selected === "cod"}
            onChange={(e) => onChange(e.target.value)}
          />
          Thanh toán khi nhận hàng (COD)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="bank"
            checked={selected === "bank"}
            onChange={(e) => onChange(e.target.value)}
          />
          Chuyển khoản ngân hàng
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
