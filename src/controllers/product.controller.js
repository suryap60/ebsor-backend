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

    const data = await productService.getAllProducts({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    return success(
      res,
      data.products,
      "Products fetched successfully",
      data.pagination 
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
      return error(res, "Product with same name already exists", 400);
    }

    const product = await productService.createProduct({
      ...req.body,
      slug,
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
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const updated = await productService.updateProduct(id, req.body);

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