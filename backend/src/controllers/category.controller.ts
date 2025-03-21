import {
  Request,
  Response,
  RequestHandler,
  Response as ExpressResponse,
} from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  exportCategoriesToExcel,
  importCategoriesFromExcel,
  downloadCategoryTemplate as downloadCategoryTemplateService,
} from "../services/category.service";

// Get all categories with pagination and filtering
export const getCategories: RequestHandler = async (req, res): Promise<void> => {
  try {
    const categories = await getAllCategories(req.query);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Get a single category by ID
export const getCategory: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await getCategoryById(id);

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

// Create a new category
export const createCategoryHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Failed to create category" });
  }
};

// Update an existing category
export const updateCategoryHandler: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await updateCategory(id, req.body);
    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: "Failed to update category" });
  }
};

// Delete a category
export const deleteCategoryHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteCategory(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete category" });
  }
};

// Export categories to Excel
export const exportCategories: RequestHandler = async (req, res): Promise<void> => {
  try {
    const buffer = await exportCategoriesToExcel();
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=categories.xlsx");
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to export categories" });
  }
};

// Import categories from Excel
export const importCategories: RequestHandler = async (req, res): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    if (!req.file?.buffer) {
      res.status(400).json({ error: "Invalid file format" });
      return;
    }

    const result = await importCategoriesFromExcel(req.file.buffer);

    res.json({
      message: `Successfully imported ${result.success} categories`,
      errors: result.errors,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to import categories" });
  }
};

// Download category template
export const downloadCategoryTemplate: RequestHandler = async (req, res): Promise<void> => {
  try {
    const buffer = await downloadCategoryTemplateService();
    
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=category_template.xlsx"
    );
    
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to download template" });
  }
};
