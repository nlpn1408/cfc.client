const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema các mặt hàng trong giỏ hàng (CartItem)
const CartItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
});

// Schema giỏ hàng chính (Cart)
const CartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Liên kết với User
  username: { type: String, required: true },
  items: [CartItemSchema],
  orderDate: { type: Date, default: Date.now },
  totalPrice: { type: Number, default: 0 }, // Thêm trường tổng giá của giỏ hàng
});

module.exports = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
