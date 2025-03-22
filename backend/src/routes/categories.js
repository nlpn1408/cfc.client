var express = require("express");
var router = express.Router();
const categoryController = require("../mongo/category.controller");

//lấy tất cả danh mục
// http:/localhost:3000/categories/
router.get("/", async (req, res) => {
  try {
    const categories = await categoryController.getAllCategories();
    return res.status(200).json(categories);
  } catch (error) {
    console.log("Lỗi lấy danh sách danh mục", error);
    return res.status(500).json({ mess: error });
  }
});

//lấy danh mục theo id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryController.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy danh mục" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.log("Lỗi lấy danh mục theo ID", error);
    return res.status(500).json({ mess: error });
  }
});
//thống kê tổng danh mục
router.get("/total-categories", async (req, res) => {
  try {
    console.log("Fetching statistics for categories...");
    const { totalCategories, categories } =
      await categoryController.getCategories();

    res.status(200).json({
      totalCategories,
      categories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//thêm mới danh mục
//http:/localhost:3000/categories/
router.post("/add", async (req, res) => {
  try {
    const body = req.body;
    const cateNew = await categoryController.addCategory(body);
    return res.status(200).json(cateNew);
  } catch (error) {
    console.log("Lỗi thêm danh mục", error);
    return res.status(500).json({ mess: error.message });
  }
});

//xóa danh mục
//http://localhost:3000/categories/delete/
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cateDel = await categoryController.removeCategory(id); // Sửa tên hàm gọi đúng
    return res.status(200).json({ CategoryDelete: cateDel });
  } catch (error) {
    console.log("Lỗi xóa danh mục theo id ", error);
    return res.status(500).json({ error: "Lỗi xóa danh mục theo id" });
  }
});

// Cập nhật danh mục theo id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    console.log("ID cần cập nhật:", id);
    console.log("Dữ liệu nhận được từ body:", body);

    const cateUpdate = await categoryController.updateCategory(id, body);

    if (!cateUpdate) {
      return res.status(404).json({ error: "Không tìm thấy danh mục" });
    }

    return res.status(200).json({ CategoryUpdate: cateUpdate });
  } catch (error) {
    console.error("Lỗi cập nhật danh mục theo id:", error.message, error.stack);
    return res.status(500).json({ error: error.message });
  }
});

// Tìm danh mục
// http://localhost:3000/categories/search/name/categoryName
router.get("/search/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const category = await categoryController.getByKey(key, value);
    return res.status(200).json({ Category: category });
  } catch (error) {
    console.error("Lỗi lấy danh mục theo key:", error.message);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
