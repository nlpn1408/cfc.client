type Props = {
  selected: string;
  onChange: (val: string) => void;
};

const PaymentMethod = ({ selected, onChange }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
      <label className="flex gap-2 mb-2">
        <input
          type="radio"
          name="payment"
          value="COD"
          checked={selected === "COD"}
          onChange={(e) => onChange(e.target.value)}
        />
        Thanh toán khi nhận hàng (COD)
      </label>
      <label className="flex gap-2">
        <input
          type="radio"
          name="payment"
          value="CREDIT_CARD"
          checked={selected === "CREDIT_CARD"}
          onChange={(e) => onChange(e.target.value)}
        />
        Chuyển khoản ngân hàng
      </label>
    </div>
  );
};

export default PaymentMethod;
