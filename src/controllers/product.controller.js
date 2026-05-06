import productModel from "../models/product.model.js";
import * as productService from "../services/product.service.js";
import { success, created, error } from "../utils/response.js";
import { slugify } from "../utils/slugify.js";

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

    // Basic validation
    if (!name || !description) {
      return error(res, "Name and description are required", 400);
    }

    // Generate slug
    const slug = slugify(name);

    // Check duplicate
    const existing = await productService.getProductBySlug(slug);
    if (existing) {
      return error(res, "Product already exists", 400);
    }

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    const product = await productService.createProduct({
      ...req.body,
      slug,
      images: imagePaths,
    });

    return created(res, product, "Product created successfully");
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
    const newImages = req.files?.map(
      (file) => `/uploads/${file.filename}`
    ) || [];

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