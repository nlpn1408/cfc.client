// controllers/cartController.js
const Cart = require("./cart.model");

async function getCart() {
  try {
    const cart = await Cart.findOne();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
}

const addToCart = async (req, res) => {
  const { userId, productId, name, price, quantity } = req.body;

  try {
    // Tìm giỏ hàng của user
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Nếu giỏ hàng đã tồn tại
      const existingProduct = cart.items.find(
        (item) => item.productId === productId
      );

      if (existingProduct) {
        // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
        existingProduct.quantity += quantity;
      } else {
        // Thêm sản phẩm mới vào giỏ
        cart.items.push({ productId, name, price, quantity });
      }
      await cart.save();
    } else {
      // Nếu giỏ hàng chưa tồn tại, tạo mới
      cart = await Cart.create({
        userId,
        items: [{ productId, name, price, quantity }],
      });
    }

    res
      .status(200)
      .json({ success: true, message: "Sản phẩm đã được thêm vào giỏ hàng." });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

async function updateCartItem() {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne();

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity = quantity;
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item", error });
  }
}

async function deleteCartItem() {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne();

    if (cart) {
      cart.items = cart.items.filter((item) => item.productId !== productId);

      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart item", error });
  }
}

async function clearCart() {
  try {
    await Cart.deleteMany({});
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
}
async function getAllCategories() {
  try {
    const categories = await categoryModel.find();
    return categories;
  } catch (error) {
    console.log("Lỗi lấy danh sách danh mục", error);
    throw error;
  }
}
module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
