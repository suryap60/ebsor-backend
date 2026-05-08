import productModel from "../models/product.model.js";
import * as productService from "../services/product.service.js";
import { success, created, error } from "../utils/response.js";
import { slugify } from "../utils/slugify.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/**
 * @desc Get all products (with pagination & search)
 * @route GET /api/products
 */
export const getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await productService.getAllProducts({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    const currentPage = Number(page);
    const totalPages = result.pagination.total_pages;

    // build next & previous
    const next =
      currentPage < totalPages
        ? `${baseUrl}?page=${currentPage + 1}&limit=${limit}&search=${search}`
        : null;

    const previous =
      currentPage > 1
        ? `${baseUrl}?page=${currentPage - 1}&limit=${limit}&search=${search}`
        : null;

    const pagination = {
      ...result.pagination,
      next,
      previous,
    };

    return success(
      res,
      result.products,
      "Products fetched successfully",
      pagination
    );
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get single product by slug
 * @route GET /api/products/:slug
 */
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await productService.getProductBySlug(slug);

    if (!product) {
      return error(res, "Product not found", 404);
    }

    return success(res, product, "Product fetched successfully");
  } catch (err) {
    next(err);
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return error(res, "Product not found", 404);
    }

    return success(res, product);
  } catch (err) {
    return error(res, err.message);
  }
};

/**
 * @desc Create new product
 * @route POST /api/products
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return error(res, "Name and description are required", 400);
    }

    const slug = slugify(name);

    const existing = await productService.getProductBySlug(slug);

    if (existing) {
      return error(res, "Product already exists", 400);
    }

    // CLOUDINARY MULTIPLE IMAGE UPLOAD
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "products",
            },
            (err, result) => {
              if (err) reject(err);
              else resolve(result.secure_url);
            }
          );

          streamifier
            .createReadStream(file.buffer)
            .pipe(stream);
        });
      });

      imageUrls = await Promise.all(uploadPromises);
    }

    const product = await productService.createProduct({
      ...req.body,
      slug,
      images: imageUrls,
    });

    return created(
      res,
      product,
      "Product created successfully"
    );

  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update product
 * @route PUT /api/products/:id
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // If name updated → update slug
    let updateData = { ...req.body };

    // slug update
    if (req.body.name) {
      updateData.slug = slugify(req.body.name);
    }

    // handle existing images
    let existingImages = [];
    if (req.body.existingImages) {
      existingImages = JSON.parse(req.body.existingImages);
    }

    // handle new uploaded images
    let newImages = [];

    if (req.files?.length > 0) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "products",
            },

            (error, result) => {
              if (result) resolve(result.secure_url);
              else reject(error);
            }
          );

          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      });

      newImages = await Promise.all(uploadPromises);
    }

    // merge images
    updateData.images = [...existingImages, ...newImages];

    const updated = await productService.updateProduct(id, updateData);

    if (!updated) {
      return error(res, "Product not found", 404);
    }

    return success(res, updated, "Product updated successfully");
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Delete product
 * @route DELETE /api/products/:id
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = await productService.deleteProduct(id);

    if (!deleted) {
      return error(res, "Product not found", 404);
    }

    return success(res, { message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};