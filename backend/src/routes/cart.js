// routes/cartRoutes.js
var express = require("express");
var router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
const {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
} = require("../mongo/cart.controller");
const Cart = require("../mongo/cart.model");
const Product = require("../mongo/product.model");

// GET: Lấy giỏ hàng của người dùng
router.get("/get", authenticateToken, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Người dùng chưa đăng nhập." });
    }

    const userId = token;

    // Tìm giỏ hàng theo userId
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng." });
    }

    // Gửi sản phẩm và thông tin giỏ hàng về client
    res.status(200).json({
      data: cart.items.map((item) => ({
        productId: item.productId._id,
        name: item.name || item.productId.name,
        price: item.price || item.productId.price,
        quantity: item.quantity,
        img: item.productId.img,
      })),
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi Server", error: err.message });
  }
});

// Thêm sản phẩm vào giỏ hàng
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { productId, name, price, quantity, img } = req.body;
    const userId = req.user.id;

    if (!productId || !name || !price || !quantity || !img) {
      return res
        .status(400)
        .json({ message: "Vui lòng truyền đầy đủ thông tin sản phẩm" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        username: req.user.username,
        items: [{ productId, name, price, quantity }],
        orderDate: new Date(),
        totalPrice: price * quantity, // Tính tổng giá ban đầu
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, name, price, quantity });
      }

      cart.orderDate = new Date();

      // Tính tổng giá giỏ hàng mới
      cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    }

    await cart.save();

    return res.status(200).json({
      message: "Sản phẩm đã được thêm vào giỏ hàng",
      cart,
      username: cart.username,
      orderDate: cart.orderDate,
      totalPrice: cart.totalPrice,
    });
  } catch (error) {
    console.error("Lỗi backend:", error.message);
    res.status(500).json({ message: "Có lỗi ở server: " + error.message });
  }
});

// Cập nhật sản phẩm trong giỏ hàng
router.put("/:productId", async (req, res) => {
  try {
    const result = await updateCartItem(req, res);
    res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi cập nhật sản phẩm trong giỏ", error);
    res.status(500).json({ mess: error.message });
  }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete("/:productId", async (req, res) => {
  try {
    const result = await deleteCartItem(req, res);
    res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi xóa sản phẩm khỏi giỏ", error);
    res.status(500).json({ mess: error.message });
  }
});

// Xóa toàn bộ giỏ hàng
router.delete("/all", async (req, res) => {
  try {
    const result = await clearCart(req, res);
    res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi xóa toàn bộ giỏ", error);
    res.status(500).json({ mess: error.message });
  }
});

// Tìm kiếm sản phẩm trong giỏ hàng
router.get("/search/:productId", async (req, res) => {
  try {
    const searchResult = await searchCartItem(req, res);
    res.status(200).json(searchResult);
  } catch (error) {
    console.log("Lỗi tìm kiếm sản phẩm trong giỏ", error);
    res.status(500).json({ mess: error.message });
  }
});
// GET: Hiển thị tất cả đơn hàng dành cho admin
router.get("/admin/orders", authenticateToken, async (req, res) => {
  try {
    // Tìm danh sách đơn hàng và populate thông tin userId và sản phẩm
    const orders = await Cart.find()
      .populate("userId", "username")
      .populate("items.productId");

    if (orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng." });
    }

    res.status(200).json({
      orders: orders.map((order) => ({
        id: order._id,
        userId: {
          id: order.userId._id,
          username: order.userId.username,
        },
        items: order.items.map((item) => ({
          productId: item.productId._id,
          name: item.name || item.productId.name,
          price: item.price || item.productId.price,
          quantity: item.quantity,
          img: item.productId.img,
        })),
        totalPrice: order.totalPrice,
        status: order.status,
        orderDate: order.orderDate, // Thêm ngày đặt hàng vào response
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

router.delete("/admin/orders/:orderId", authenticateToken, async (req, res) => {
  try {
    const { orderId } = req.params;

    // Xóa đơn hàng theo orderId trong database
    const order = await Cart.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại." });
    }

    await Cart.findByIdAndDelete(orderId);

    return res.status(200).json({ message: "Đã xóa đơn hàng thành công!" });
  } catch (error) {
    console.error("Lỗi xóa đơn hàng", error.message);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

// API tính tổng doanh thu
router.get("/total-revenue", async (req, res) => {
  try {
    // Tính tổng giá trị từ tất cả đơn hàng
    const orders = await Cart.find();

    let totalRevenue = 0;
    orders.forEach((order) => {
      totalRevenue += order.items.reduce(
        (sum, item) => sum + item.totalprice * item.quantity,
        0
      );
    });

    res.status(200).json({
      totalRevenue,
    });
  } catch (error) {
    console.error("Lỗi tính tổng doanh thu:", error.message);
    res.status(500).json({ message: "Có lỗi ở server: " + error.message });
  }
});
module.exports = router;
