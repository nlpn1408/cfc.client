import { PrismaClient } from "@prisma/client";
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

// Function to get all categories
async function getAllCategories(options: any): Promise<any[]> {
  const {
    page = 1,
    limit = 10,
    sort_by,
    order,
  } = options;

  return await prisma.category.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: sort_by && order ? [{ [sort_by]: order }] : undefined,
  });
}

// Function to get a category by ID
async function getCategoryById(id: string): Promise<any | null> {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          images: {
            select: { id: true, isThumbnail: true },
          },
        },
      },
    },
  });
}

// Function to create a new category
async function createCategory(data: any): Promise<any> {
  return await prisma.category.create({
    data,
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
}

// Function to update a category
async function updateCategory(id: string, data: any): Promise<any | null> {
  return await prisma.category.update({
    where: { id },
    data,
    include: {
      _count: {
        select: { products: true }
      }
    }
  });
}

// Function to delete a category
async function deleteCategory(id: string): Promise<void> {
  await prisma.category.delete({
    where: { id }
  });
}

// Function to export categories to Excel
async function exportCategoriesToExcel(): Promise<Buffer> {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    }
  });

  // Transform data for Excel
  const excelData = categories.map(category => ({
    ID: category.id,
    Name: category.name,
    Description: category.description || '',
    ProductCount: category._count.products,
    CreatedAt: category.createdAt,
    UpdatedAt: category.updatedAt
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Categories');

  // Generate buffer
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

interface CategoryRow {
  Name: string;
  Description?: string;
}

// Function to import categories from Excel
async function importCategoriesFromExcel(file: Buffer): Promise<{ success: number; errors: string[] }> {
  const workbook = XLSX.read(file, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet) as CategoryRow[];

  const errors: string[] = [];
  let successCount = 0;

  for (const row of data) {
    try {
      // Validate required fields
      if (!row.Name) {
        errors.push(`Row ${successCount + errors.length + 1}: Name is required`);
        continue;
      }

      // Create category
      await prisma.category.create({
        data: {
          name: row.Name,
          description: row.Description || null,
        }
      });

      successCount++;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      errors.push(`Row ${successCount + errors.length + 1}: ${errorMessage}`);
    }
  }

  return { success: successCount, errors };
}

// Add this function to category.service.ts
async function downloadCategoryTemplate(): Promise<Buffer> {
  const templateData = [
    {
      Name: "Example Category",
      Description: "Example Description"
    }
  ];

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(templateData);
  
  // Set column widths
  const colWidths = [
    { wch: 30 }, // Name column
    { wch: 50 }  // Description column
  ];
  worksheet['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  exportCategoriesToExcel,
  importCategoriesFromExcel,
  downloadCategoryTemplate,
}; 