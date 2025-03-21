import express from "express";
import * as productController from "../controllers/product.controller";
import multer from "multer";
import { authenticate, isAdmin } from "../middlewares/auth.middleware";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", productController.getProducts);
router.get("/:id", authenticate, productController.getProduct);
router.post(
  "/",
  authenticate,
  isAdmin,
  upload.array("images"),
  productController.createProduct
);
router.put(
  "/:id",
  authenticate,
  isAdmin,
  upload.array("images"),
  productController.updateProduct
);
router.delete("/:id", authenticate, isAdmin, productController.deleteProduct);

export default router;
