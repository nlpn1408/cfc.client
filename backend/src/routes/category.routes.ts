import express from "express";
import multer from "multer";
import {
  getCategories,
  getCategory,
  createCategoryHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
  exportCategories,
  importCategories,
  downloadCategoryTemplate,
} from "../controllers/category.controller";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/", createCategoryHandler);
router.put("/:id", updateCategoryHandler);
router.delete("/:id", deleteCategoryHandler);

// Excel import/export routes
router.get("/export", exportCategories);
router.post("/import", upload.single("file"), importCategories);

router.get("/template", downloadCategoryTemplate);

export default router;
