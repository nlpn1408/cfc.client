var express = require("express");
var router = express.Router();
const checktoken = require("../helper/checktoken");
const productController = require("../mongo/product.controller");
const multer = require("multer");
const path = require("path");
//thêm sản phẩm bằng link
// router.post("/", async (req, res, next) => {
//   try {
//     const { name, image, price_1, price_2, mota_1, mota_2, category } = req.body;
//     const product = await productController.insert({ name, image, price_1, price_2, mota_1, mota_2, category });
//     return res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

//thêm sản phẩm bằng file

// Thiết lập nơi lưu trữ và tên file
// Cấu hình lưu trữ file
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Kiểm tra định dạng file
function checkFileUpLoad(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
    return cb(new Error("Bạn chỉ được upload file ảnh"));
  }
  cb(null, true);
}

// Cấu hình Multer
let upload = multer({
  storage: storage,
  fileFilter: checkFileUpLoad,
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file (5MB)
});

// Route thêm sản phẩm
router.post("/add", upload.single("img"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const img = req.file ? req.file.filename : null;

    // Thêm sản phẩm vào cơ sở dữ liệu
    const product = await productController.insert({
      name,
      price,
      description,
      category,
      img,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Xử lý lỗi tải lên file
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: "Lỗi khi tải lên file" });
  } else if (err) {
    res.status(400).json({ message: err.message });
  } else {
    next();
  }
});
router.get("/page", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Trang hiện tại (mặc định là 1)
    const limit = parseInt(req.query.limit) || 10; // Số sản phẩm mỗi trang (mặc định là 10)

    const productData = await productController.getProPage(page, limit);
    return res.status(200).json(productData);
  } catch (error) {
    console.error("Lỗi khi phân trang sản phẩm:", error.message);
    res.status(500).json({ message: error.message });
  }
});

//phân trang
// routes/products.js
router.get("/paginated/products", async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const sortBy = req.query.sortBy || "new";

    console.log("Params received:", { pageNumber, limit, sortBy });

    const paginatedProducts =
      await productController.getPaginatedAndSortedProducts(
        pageNumber,
        limit,
        sortBy
      );

    return res.status(200).json(paginatedProducts);
  } catch (error) {
    console.error("Backend error:", error.message);
    res.status(500).json({ msg: "Internal Server Error", error });
  }
});
//thống kê tổng số sản phẩm
router.get("/total-products", async (req, res) => {
  try {
    const products = await productController.getAll();

    res.status(200).json({
      totalProducts: products.totalProducts,
    });
  } catch (error) {
    console.error("Lỗi thống kê tổng số sản phẩm:", error.message);
    res.status(500).json({ message: error.message });
  }
});

//hiển thị tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const pros = await productController.getpros();
    console.log({ pros });

    return res.status(200).json(pros);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả sản phẩm:", error);
    res.status(500).json({ message: error });
  }
});

//hiển thị sản phẩm hot
router.get("/hot", async (req, res) => {
  try {
    const hotProducts = await productController.getHotProduct();
    return res.status(200).json(hotProducts);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm hot:", error);
    res.status(500).json({ message: error });
  }
});

//hiển thị sản phẩm giảm giá
router.get("/sale", async (req, res) => {
  try {
    const saleProducts = await productController.getSaleProduct();
    return res.status(200).json(saleProducts);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm giảm giá:", error);
    res.status(500).json({ message: error });
  }
});
//hiển thị sản phẩm bán chạy
router.get("/bestseller", async (req, res) => {
  try {
    const bestSeller = await productController.getBestSeller();
    return res.status(200).json(bestSeller);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm hot:", error);
    res.status(500).json({ message: error });
  }
});

// hiển thị sản phẩm theo danh mục tiểu thuyết
router.get("/ao", async (req, res) => {
  try {
    const ao = await productController.getByCategory(
      "667e809079fe53d25034cf8a"
    );
    return res.status(200).json(ao);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm tiểu thuyết:", error);
    res.status(500).json({ message: error });
  }
});

// hiển thị sản phẩm theo danh mục văn học
router.get("/quan", async (req, res) => {
  try {
    z;
    const quan = await productController.getByCategory(
      "667e806c79fe53d25034cf88"
    );
    return res.status(200).json(quan);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm văn học:", error);
    res.status(500).json({ message: error });
  }
});

// danh sách sản phẩm mới
router.get("/new", async (req, res) => {
  try {
    const products = await productController.getNew();
    res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm mới:", error.message);
    res.status(500).json({ message: error });
  }
});

// Lấy tất cả sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await productController.getAll();
    return res.status(200).json({ Products: products });
  } catch (error) {
    console.error("Lỗi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: error });
  }
});

// Lấy sản phẩm theo ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productController.getProductById(productId);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo ID:", error.message);
    res.status(500).json({ message: error });
  }
});

// Cập nhật sản phẩm theo id
// router.put("/:id",  upload.single('image'), async (req, res, next) => {
//   try {
//     let {id}=req.params;
//     let { name, image, price_1, price_2, mota_1, mota_2, category } = req.body;
//     const product = await productController.updateById(id, { name, image, price_1, price_2, mota_1, mota_2, category });
//     return res.status(200).json(product);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// Cập nhật sản phẩm theo id
router.put("/:id", upload.single("img"), async (req, res, next) => {
  try {
    let { id } = req.params;
    let { name, price, description, categoryId } = req.body;
    const img = req.file ? req.file.originalname : null; // Check if file is provided

    const product = await productController.updateById(id, {
      name,
      price,
      description,
      categoryId,
      img,
    });
    return res.status(200).json(product);
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm:", error.message);
    res.status(500).json({ message: error.message });
  }
});

//xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const proDel = await productController.remove(id);
    return res.status(200).json({ ProductDelete: proDel });
  } catch (error) {
    console.log("Lỗi xóa sản phẩm theo id ", error);
    return res.status(500).json({ mess: error });
  }
});

//xem chi tiết
router.get("/detail/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const sp = await productController.getProductDetail(productId);
    return res.status(200).json(sp);
  } catch (error) {
    console.log("Lỗi lấy thông tin sản phẩm", error);
    return res.status(500).json({ mess: error });
  }
});

//lấy danh sách sản phẩm theo mã danh mục
//http://localhost:3000/products/category/id
router.get("/category/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    console.log("Category ID from Router:", categoryId);

    const products = await productController.getByCategory(categoryId);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo danh mục:", error.message);
    res.status(500).json({ message: error.message });
  }
});
// tìm sản phẩm
//http://localhost:3000/products/search/name/
router.get("/search/:key/:value", async (req, res) => {
  try {
    const { key, value } = req.params;
    const product = await productController.getByKey(key, value);
    return res.status(200).json({ Product: product });
  } catch (error) {
    console.error("Lỗi lấy sản phẩm theo key:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm có sắp xếp giá tăng dần và giới hạn số lượng
//http://localhost:3000/products/giatangdan
router.get("/giatangdan", async (req, res) => {
  try {
    const product = await productController.getGiaTangDan();
    res.status(200).json(product);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm liên quan với sản phẩm hiển thị ở trang chi tiết
//http://localhost:3000/products/lienquan/
router.get("/lienquan/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    console.log({ categoryId: categoryId });

    if (!categoryId) {
      return res.status(400).json({ message: "Thiếu categoryId" });
    }

    const sanPhamLienQuan = await productController.getProLienQuan(categoryId);
    console.log({ sanPhamLienQuan: sanPhamLienQuan });

    res.status(200).json(sanPhamLienQuan);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm liên quan:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi máy chủ, không thể lấy sản phẩm liên quan" });
  }
});

// Tìm và xóa sản phẩm theo điều kiện tên
//http://localhost:3000/products/timvaxoa/
router.delete("/timvaxoa/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const result = await productController.timvaxoa(name);
    return res.status(200).json({ protimvaxoa: result });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm không thành công:", error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
});

//Tìm và xóa sản phẩm theo điều kiện giá
//http://localhost:3000/products/delete-by-price/:price
router.delete("/delete-by-price/:price", async (req, res) => {
  try {
    const price = parseFloat(req.params.price);
    const deletedProducts = await productController.deleteByPrice(price);
    return res.status(200).json({ DeletedProducts: deletedProducts });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo điều kiện giá:", error.message);
    res.status(500).json({ message: error });
  }
});

//Lấy danh sách sản phẩm theo trang và giới hạn số lượng
//http://localhost:3000/products/products?limit=1?page=1
router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const proPage = await productController.getProPage(page, limit);
    return res.status(200).json({ proPage: proPage });
  } catch (error) {
    console.error("Lỗi xóa sản phẩm theo trang:", error.message);
    res.status(500).json({ message: error });
  }
});

//sản phẩm liên quan
router.get("/related/:id/related", async (req, res) => {
  try {
    const { id } = req.params;
    const relatedProducts =
      await productController.getRelatedProductsByProductId(id);
    return res.status(200).json(relatedProducts);
  } catch (error) {
    console.log("Lỗi lấy sản phẩm liên quan theo danh mục", error);
    return res.status(500).json({ message: error.message });
  }
});

//tìm kiếm theo tên
router.get("/search/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const products = await productController.findByName(name);
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
