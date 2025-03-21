import { Request, Response } from "express";
import multer from "multer";
import * as productService from "../services/product.service";
import Joi from "joi";
import { UploadedFile } from "express-fileupload";

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category_id: Joi.number().required(),
  brand_id: Joi.number().required(),
  mainImageIndex: Joi.number().required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category_id: Joi.number().required(),
  brand_id: Joi.number().required(),
  imagesToDelete: Joi.array().items(Joi.string()).required(),
  mainImageId: Joi.string().required(),
}).min(1);

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { error } = createProductSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const product = await productService.createProduct(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
        brand_id: req.body.brand_id,
      },
      Array.isArray(req.files) ? (req.files as unknown as UploadedFile[]) : [],
      req.body.mainImageIndex
    );
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { error } = updateProductSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  try {
    const product = await productService.updateProduct(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category_id: req.body.category_id,
        brand_id: req.body.brand_id,
      },
      Array.isArray(req.files) ? (req.files as unknown as UploadedFile[]) : [],
      req.body.imagesToDelete,
      req.body.mainImageId
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
