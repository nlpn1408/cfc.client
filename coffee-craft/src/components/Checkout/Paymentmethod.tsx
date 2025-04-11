type Props = {
  selected: string;
  onChange: (val: string) => void;
};

const PaymentMethod = ({ selected, onChange }: Props) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
      <label className="flex gap-2 mb-2">
        <input type="radio" name="payment" value="cod" checked={selected === "cod"} onChange={(e) => onChange(e.target.value)} />
        Thanh toán khi nhận hàng (COD)
      </label>
      <label className="flex gap-2">
        <input type="radio" name="payment" value="bank" checked={selected === "bank"} onChange={(e) => onChange(e.target.value)} />
        Chuyển khoản ngân hàng
      </label>
    </div>
  );
};

export default PaymentMethod;
