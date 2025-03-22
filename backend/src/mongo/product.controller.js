const productModel = require("./product.model");
const categoryModel = require("./category.model");
const ProductResponse = require("../response/productResponse");

module.exports = {
  getpros,
  getProductById,
  getByCategory,
  getHotProduct,
  getSaleProduct,
  getNewProduct,
  getBestSeller,
  getNew,
  insert,
  getAll,
  getProLienQuan,
  getByKey,
  updateById,
  remove,
  // deleteByPrice,
  getProPage,
  getProductDetail,
  timvaxoa,
  // getRelatedProductsByProductId,
  findByName,
  getPaginatedAndSortedProducts,
};

// Thêm sản phẩm
async function insert(body) {
  try {
    const {
      name,
      img,
      // img2,
      // img3,
      // img4,
      description,
      price,
      // price2,
      category,
    } = body;

    // Kiểm tra đầu vào
    if (
      !name ||
      !img ||
      // !img2 ||
      // !img3 ||
      // !img4 ||
      !description ||
      !price ||
      // !price2 ||
      !category
    ) {
      throw new Error("Thông tin sản phẩm không đầy đủ");
    }

    // Kiểm tra danh mục
    const categoryFind = await categoryModel.findById(category);
    if (!categoryFind) {
      throw new Error("Không tìm thấy danh mục");
    }

    // Tạo đối tượng sản phẩm mới
    const proNew = new productModel({
      name,
      img,
      description,
      price,
      category: {
        categoryId: categoryFind._id,
        categoryName: categoryFind.name,
      },
    });

    console.log({ proNew });

    // Lưu sản phẩm vào cơ sở dữ liệu
    const result = await proNew.save();
    return result;
  } catch (error) {
    // Ghi log chi tiết lỗi và ném lại lỗi để xử lý ở nơi gọi hàm
    console.error("Lỗi insert product: ", error.message);
    throw new Error(error.message || "Lỗi trong quá trình lưu sản phẩm");
  }
}

// Lấy tất cả sản phẩm
async function getpros() {
  try {
    const result = await productModel.find();
    const totalProducts = result.length;

    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / 10),
      1,
      result
    );
  } catch (error) {
    console.log("Lỗi lấy danh sách", error);
    throw error;
  }
}

// Lấy sản phẩm theo id
async function getProductById(productId) {
  try {
    const product = await productModel.findById(productId);
    return product;
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    throw error;
  }
}

// Lấy danh sách sản phẩm theo danh mục
async function getByCategory(categoryId) {
  try {
    console.log("Category ID received:", categoryId);

    const productsCategory = await productModel
      .find({
        "category.categoryId": categoryId,
      })
      .lean();

    console.log(JSON.stringify(productsCategory, null, 2));

    const totalProducts = productsCategory.length;

    return {
      totalProducts,
      products: productsCategory,
    };
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo danh mục", error.message);
    throw error;
  }
}

// Xem chi tiết sản phẩm
async function getProductDetail(productId) {
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    return product;
  } catch (error) {
    console.error("Lỗi lấy thông tin chi tiết sản phẩm:", error);
    throw error;
  }
}

// Sản phẩm nổi bật
async function getHotProduct() {
  try {
    const result = await productModel
      .find({ view: { $gte: 100 } })
      .sort({ view: -1 })
      .limit(8);
    const totalProducts = result.length;

    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / 10),
      1,
      result
    );
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm hot", error);
    throw error;
  }
}

// Lấy sản phẩm giảm giá
async function getSaleProduct() {
  try {
    const prosale = await productModel.find().sort({ price: -1 }).limit(8);
    const totalProducts = prosale.length;

    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / 10),
      1,
      prosale
    );
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm giảm giá", error);
    throw error;
  }
}

// Lấy sản phẩm mới
async function getNewProduct() {
  try {
    const newProducts = await productModel
      .find()
      .sort({ createdAt: -1 })
      .limit(8);
    const totalProducts = newProducts.length;

    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / 10),
      1,
      newProducts
    );
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm mới:", error.message);
    throw error;
  }
}

// Lấy sản phẩm bán chạy
async function getBestSeller() {
  try {
    const bestSeller = await productModel.find().sort({ sold: -1 }).limit(8);
    const totalProducts = bestSeller.length;

    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / 10),
      1,
      bestSeller
    );
  } catch (error) {
    console.log("Lỗi lấy danh sách sản phẩm bán chạy:", error.message);
    throw error;
  }
}

// Lấy tất cả sản phẩm
async function getAll() {
  try {
    const result = await productModel.find();
    const totalProducts = result.length;

    return {
      totalProducts,
      products: result,
    };
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm", error);
    throw error;
  }
}

// Lấy sản phẩm mới
async function getNew() {
  try {
    const result = await productModel.find().sort({ _id: -1 }).limit(5);
    const totalProducts = result.length;

    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / 10),
      1,
      result
    );
  } catch (error) {
    console.log("Lỗi lấy sản phẩm mới", error);
    throw error;
  }
}

// Tìm kiếm sản phẩm
async function getByKey(key, value) {
  try {
    let pro = await productModel.findOne(
      { [key]: value },
      "name price category"
    );
    pro = {
      Masp: pro._id,
      Ten: pro.name,
      Gia: pro.price,
      Danhmuc: pro.category,
    };
    return pro;
  } catch (error) {
    console.log("Lỗi lấy sản phẩm: ", error);
    throw error;
  }
}

// Lấy danh sách sản phẩm theo trang và giới hạn số lượng
async function getProPage(page = 1, limit = 10) {
  try {
    const skip = (page - 1) * limit;
    const result = await productModel.find().skip(skip).limit(limit);

    // Đếm tổng số sản phẩm
    const totalProducts = await productModel.countDocuments();

    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / limit),
      page,
      result
    );
  } catch (error) {
    console.log("Lỗi lấy sản phẩm theo trang", error.message);
    throw error;
  }
}

// Cập nhật sản phẩm
async function updateById(id, body) {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    const { name, price, description, category, img } = body;
    let categoryFind = null;

    if (category) {
      categoryFind = await categoryModel.findById(category);
      if (!categoryFind) {
        throw new Error("Không tìm thấy danh mục");
      }
    }

    const categoryUpdate = categoryFind
      ? {
          category: categoryFind._id,
          categoryName: categoryFind.name,
        }
      : product.category;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        name,
        price,
        img: img || product.img,
        description,
        category: categoryUpdate,
      },
      { new: true }
    );

    return updatedProduct;
  } catch (error) {
    console.log("Lỗi cập nhật sản phẩm:", error);
    throw error;
  }
}

// Xóa sản phẩm
async function remove(id) {
  try {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm để xóa");
    }
    await productModel.deleteOne({ _id: id });
    return { message: "Xóa sản phẩm thành công" };
  } catch (error) {
    console.log("Lỗi xóa sản phẩm:", error);
    throw error;
  }
}

//phân trang
async function getPaginatedAndSortedProducts(pageNumber, limit, sortBy) {
  try {
    const totalProducts = await productModel.countDocuments().exec();

    let sortOption = {};
    if (sortBy === "new") {
      sortOption = { _id: -1 }; // Sắp xếp theo sản phẩm mới nhất
    } else if (sortBy === "priceAsc") {
      sortOption = { price: 1 };
    } else if (sortBy === "priceDesc") {
      sortOption = { price: -1 };
    }

    const products = await productModel
      .find()
      .sort(sortOption)
      .skip(pageNumber * limit)
      .limit(limit)
      .exec();

    return { totalProducts, products };
  } catch (error) {
    console.error("Controller Error:", error.message);
    throw new Error("Failed to get products.");
  }
}

// Tìm kiếm và xóa sản phẩm
async function timvaxoa(name) {
  try {
    const product = await productModel.findOne({ name });
    if (!product) {
      throw new Error("Không tìm thấy sản phẩm để xóa");
    }
    await productModel.deleteOne({ name });
    return { message: "Xóa sản phẩm thành công" };
  } catch (error) {
    console.log("Lỗi xóa sản phẩm:", error);
    throw error;
  }
}

// Lấy sản phẩm liên quan
async function getProLienQuan(categoryId) {
  try {
    // Tìm các sản phẩm theo danh mục, chuyển categoryId thành ObjectId
    const products = await productModel
      .find({ "category.categoryId": categoryId })
      .limit(5); // Giới hạn 5 sản phẩm liên quan

    const totalProducts = products.length;

    // Tạo và trả về đối tượng ProductResponse
    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / 10),
      1,
      products
    );
  } catch (error) {
    console.log("Lỗi lấy sản phẩm liên quan:", error);
    throw error; // Bắn lỗi ra để route có thể bắt
  }
}

// Tìm sản phẩm theo tên
async function findByName(name) {
  try {
    const products = await productModel.find({
      name: { $regex: name, $options: "i" },
    });
    const totalProducts = products.length;

    return new ProductResponse(
      totalProducts,
      Math.ceil(totalProducts / 10),
      1,
      products
    );
  } catch (error) {
    console.log("Lỗi tìm sản phẩm:", error);
    throw error;
  }
}
