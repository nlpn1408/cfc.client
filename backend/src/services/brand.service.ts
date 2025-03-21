import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

const prisma = new PrismaClient();

// Function to get all brands
async function getAllBrands(options: any): Promise<any[]> {
  const { page = 1, limit = 10, sort_by, order } = options;

  return await prisma.brand.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: sort_by && order ? [{ [sort_by]: order }] : undefined,
  });
}

// Function to get a brand by ID
async function getBrandById(id: string): Promise<any | null> {
  return await prisma.brand.findUnique({
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

// Function to create a new brand
async function createBrand(data: any): Promise<any> {
  return await prisma.brand.create({
    data,
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

// Function to update a brand
async function updateBrand(id: string, data: any): Promise<any | null> {
  return await prisma.brand.update({
    where: { id },
    data,
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

// Function to delete a brand
async function deleteBrand(id: string): Promise<void> {
  await prisma.brand.delete({
    where: { id },
  });
}

// Function to export brands to Excel
async function exportBrandsToExcel(): Promise<Buffer> {
  const brands = await prisma.brand.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
  });

  const excelData = brands.map((brand) => ({
    ID: brand.id,
    Name: brand.name,
    Description: brand.description || "",
    ProductCount: brand._count.products,
    CreatedAt: brand.createdAt,
    UpdatedAt: brand.updatedAt,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Brands");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

interface BrandRow {
  Name: string;
  Description?: string;
  Website?: string;
}

// Function to import brands from Excel
async function importBrandsFromExcel(
  file: Buffer
): Promise<{ success: number; errors: string[] }> {
  const workbook = XLSX.read(file, { type: "buffer" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet) as BrandRow[];

  const errors: string[] = [];
  let successCount = 0;

  for (const row of data) {
    try {
      if (!row.Name) {
        errors.push(
          `Row ${successCount + errors.length + 1}: Name is required`
        );
        continue;
      }

      await prisma.brand.create({
        data: {
          name: row.Name,
          description: row.Description || null,
        },
      });

      successCount++;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      errors.push(`Row ${successCount + errors.length + 1}: ${errorMessage}`);
    }
  }

  return { success: successCount, errors };
}

// Add this function to brand.service.ts
async function downloadBrandTemplate(): Promise<Buffer> {
  const templateData = [
    {
      Name: "Example Brand",
      Description: "Example Description",
      Website: "https://example.com"
    }
  ];

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(templateData);
  
  // Set column widths
  const colWidths = [
    { wch: 30 }, // Name column
    { wch: 50 }, // Description column
    { wch: 40 }  // Website column
  ];
  worksheet['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, "Brands");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
}

export {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  exportBrandsToExcel,
  importBrandsFromExcel,
  downloadBrandTemplate,
};
