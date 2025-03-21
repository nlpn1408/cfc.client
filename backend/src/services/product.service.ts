import { UploadedFile } from "express-fileupload";
import cloudinary from "cloudinary";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Function to upload an image to Cloudinary
async function uploadImage(file: UploadedFile) {
  return await cloudinary.v2.uploader.upload(file.tempFilePath, {
    eager: [
      { width: 200, height: 200, crop: "fill", gravity: "center" },
      { width: 800, height: 600, crop: "fill", gravity: "center" },
    ],
  });
}

// Function to delete an image from Cloudinary
async function deleteImage(imageId: string): Promise<void> {
  await cloudinary.v2.uploader.destroy(imageId);
}

// Function to get all products with images
async function getAllProducts(options: any): Promise<any[]> {
  const {
    page = 1,
    limit = 10,
    sort_by,
    order,
    category_id,
    brand_id,
    min_price,
    max_price,
  } = options;

  const where: any = {
    ...(category_id && { category_id }),
    ...(brand_id && { brand_id }),
    ...(min_price || max_price) && {
      price: {
        ...(min_price && { gte: parseFloat(min_price) }),
        ...(max_price && { lte: parseFloat(max_price) }),
      },
    },
  };

  return await prisma.product.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    include: {
      images: {
        select: { id: true, isThumbnail: true },
      },
    },
    orderBy: sort_by && order ? [{ [sort_by]: order }] : undefined,
  });
}

// Function to get a product by ID with images
async function getProductById(id: string): Promise<any | null> {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      images: {
        select: { id: true, isThumbnail: true },
      },
    },
  });
}

// Function to create a new product with images
async function createProduct(
  data: any,
  images: UploadedFile[],
  mainImageIndex: number
): Promise<any> {
  if (!images?.length) {
    throw new Error("At least one image is required");
  }

  if (mainImageIndex >= images.length || mainImageIndex < 0) {
    throw new Error("Invalid main image index");
  }

  const product = await prisma.product.create({ data });

  const imagePromises = images.map(async (file, index) => {
    const image = await uploadImage(file);
    return prisma.productImage.create({
      data: {
        productId: product.id,
        id: image.public_id,
        url: image.url,
        order: index,
        isThumbnail: index === mainImageIndex,
      },
    });
  });

  await Promise.all(imagePromises);

  return await getProductById(product.id);
}

// Function to update a product with images
async function updateProduct(
  id: string,
  data: any,
  newImages: UploadedFile[],
  imagesToDelete: string[],
  mainImageId: string
): Promise<any | null> {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return null;

  const existingImages = await prisma.productImage.findMany({
    where: { productId: id },
  });
  const imagesToKeep = existingImages
    .filter((img: any) => !imagesToDelete.includes(img.id))
    .map((img: any) => img.id);

  if (newImages.length) {
    const uploadPromises = newImages.map(async (file) => {
      const image = await uploadImage(file);
      imagesToKeep.push(image.public_id);
      return prisma.productImage.create({
        data: {
          productId: id,
          id: image.public_id,
          url: image.url,
        },
      });
    });
    await Promise.all(uploadPromises);
  }

  if (!imagesToKeep.length) {
    throw new Error("At least one image is required");
  }

  if (!imagesToKeep.includes(mainImageId)) {
    throw new Error("Thumbnail image ID must be in the kept images");
  }

  const deletePromises = imagesToDelete.map(async (imageId) => {
    await deleteImage(imageId);
    return prisma.productImage.delete({ where: { id: imageId } });
  });

  await Promise.all([
    ...deletePromises,
    prisma.productImage.updateMany({
      where: { productId: id },
      data: { isThumbnail: false },
    }),
    prisma.productImage.update({
      where: { id: mainImageId },
      data: { isThumbnail: true },
    }),
    prisma.product.update({ where: { id }, data }),
  ]);

  return await getProductById(id);
}

// Function to delete a product and its images
async function deleteProduct(id: string): Promise<void> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!product) return;

  const deletePromises = product.images.map(async (image: any) => {
    await deleteImage(image.id);
    return prisma.productImage.delete({ where: { id: image.id } });
  });

  await Promise.all([
    ...deletePromises,
    prisma.product.delete({ where: { id } }),
  ]);
}

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
