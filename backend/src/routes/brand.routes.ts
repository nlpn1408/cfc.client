import express from "express";
import multer from "multer";
import {
  getBrands,
  getBrand,
  createBrandHandler,
  updateBrandHandler,
  deleteBrandHandler,
  exportBrands,
  importBrands,
  downloadBrandTemplate,
} from "../controllers/brand.controller";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Basic CRUD routes
router.get("/", getBrands as express.RequestHandler);
router.get("/:id", getBrand as express.RequestHandler);
router.post("/", createBrandHandler as express.RequestHandler);
router.put("/:id", updateBrandHandler as express.RequestHandler);
router.delete("/:id", deleteBrandHandler as express.RequestHandler);

// Excel import/export routes
router.get("/export", exportBrands);
router.post(
  "/import",
  upload.single("file"),
  importBrands as express.RequestHandler
);

// Add this route to brand.routes.ts
router.get("/template", downloadBrandTemplate);

export default router;
