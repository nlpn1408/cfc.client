//thực hiện thao tác CRUD với collection categories
const productModel = require("./product.model");
const categoryModel = require("./category.model");

module.exports = {
  getCategoryById,
  getByKey,
  addCategory,
  removeCategory,
  updateCategory,
  getAllCategories,
  getCategories,
};

//lay danh muc
async function getAllCategories() {
  try {
    const categories = await categoryModel.find();
    return categories;
  } catch (error) {
    console.log("Lỗi lấy danh sách danh mục", error);
    throw error;
  }
}

// Trong backend (categoryController.js)
async function getCategories() {
  try {
    console.log("Fetching categories from database...");
    const categories = await categoryModel.find().lean();
    const totalCategories = categories.length;

    console.log("Categories fetched:", categories); // Debug thêm
    return {
      totalCategories,
      categories,
    };
  } catch (error) {
    console.error("Error fetching categories:", error.message); // Log lỗi cụ thể hơn
    throw new Error("Failed to fetch categories from database");
  }
}

// Lấy danh mục theo ID
async function getCategoryById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Category ID" });
  }
  try {
    const category = await categoryModel.findById(id);
    return category;
  } catch (error) {
    console.log("Lỗi lấy danh mục theo ID", error);
    throw error;
  }
}

//thêm danh mục
async function addCategory(body) {
  try {
    const { name, description } = body;
    const categoryNew = new categoryModel({ name, description });
    const result = await categoryNew.save();
    return result;
  } catch (error) {
    console.log("Lỗi thêm danh mục", error);
    throw error;
  }
}

// xóa danh mục
async function removeCategory(id) {
  try {
    const result = await categoryModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    console.log("Lỗi khi xóa danh mục", error);
    throw error;
  }
}

//cập nhật danh mục
async function updateCategory(id, body) {
  try {
    const cate = await categoryModel.findById(id);
    if (!cate) {
      throw new Error("Không tìm thấy danh mục");
    }
    const { name, description } = body;
    const result = await categoryModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log("Lỗi khi cập nhật danh mục", error);
    throw error;
  }
}

//tìm kiếm danh mục
async function getByKey(key, value) {
  try {
    let cate = await categoryModel.findOne({ [key]: value }, "description");
    cate = {
      Madm: cate._id,
      Mota: cate.description,
    };
    return cate;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm: ", error);
    throw error;
  }
}
