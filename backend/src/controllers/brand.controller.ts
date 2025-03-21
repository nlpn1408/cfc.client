import { Request, Response, RequestHandler } from "express";
import {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  exportBrandsToExcel,
  importBrandsFromExcel,
  downloadBrandTemplate as downloadBrandTemplateService,
} from "../services/brand.service";

// Get all brands with pagination and filtering
export async function getBrands(req: Request, res: Response) {
  try {
    const brands = await getAllBrands(req.query);
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brands" });
  }
}

// Get a single brand by ID
export async function getBrand(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const brand = await getBrandById(id);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch brand" });
  }
}

// Create a new brand
export async function createBrandHandler(req: Request, res: Response) {
  try {
    const brand = await createBrand(req.body);
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ error: "Failed to create brand" });
  }
}

// Update an existing brand
export async function updateBrandHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const brand = await updateBrand(id, req.body);

    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }

    res.json(brand);
  } catch (error) {
    res.status(400).json({ error: "Failed to update brand" });
  }
}

// Delete a brand
export async function deleteBrandHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteBrand(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete brand" });
  }
}

// Export brands to Excel
export async function exportBrands(req: Request, res: Response) {
  try {
    const buffer = await exportBrandsToExcel();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=brands.xlsx");

    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to export brands" });
  }
}

// Import brands from Excel
export async function importBrands(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await importBrandsFromExcel(req.file.buffer);

    res.json({
      message: `Successfully imported ${result.success} brands`,
      errors: result.errors,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to import brands" });
  }
}

// Download brand template
export const downloadBrandTemplate: RequestHandler = async (req, res): Promise<void> => {
  try {
    const buffer = await downloadBrandTemplateService();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=brand_template.xlsx"
    );

    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to download template" });
  }
};
