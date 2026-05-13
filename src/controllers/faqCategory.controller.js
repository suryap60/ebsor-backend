import faqCategoryModel from "../models/faqCategory.model.js";

import * as faqCategoryService from "../services/faqCategory.service.js";

import { success, created, error } from "../utils/response.js";

import { slugify } from "../utils/slugify.js";

// GET ALL FAQ CATEGORIES
export const getFaqCategories = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
    } = req.query;

    const result =
      await faqCategoryService.getAllFaqCategories({
        page: Number(page),
        limit: Number(limit),
        search,
      });

    const baseUrl =
      `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    const currentPage = Number(page);

    const totalPages =
      result.pagination.total_pages;

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
      result.categories,
      "FAQ Categories fetched successfully",
      pagination
    );
  } catch (err) {
    next(err);
  }
};

// GET SINGLE CATEGORY BY ID
export const getFaqCategoryById = async (
  req,
  res
) => {
  try {
    const category =
      await faqCategoryModel.findById(
        req.params.id
      );

    if (!category) {
      return error(
        res,
        "FAQ Category not found",
        404
      );
    }

    return success(
      res,
      category,
      "FAQ Category fetched successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
};

// CREATE CATEGORY
export const createFaqCategory = async (
  req,
  res,
  next
) => {
  try {
    const { name } = req.body;

    if (!name) {
      return error(
        res,
        "Category name is required",
        400
      );
    }

    const slug = slugify(name);

    // CHECK DUPLICATE
    const existing =
      await faqCategoryModel.findOne({
        slug,
      });

    if (existing) {
      return error(
        res,
        "Category already exists",
        400
      );
    }

    const category =
      await faqCategoryService.createFaqCategory({
        name,
        slug,
      });

    return created(
      res,
      category,
      "Category created successfully"
    );
  } catch (err) {
    next(err);
  }
};

// UPDATE CATEGORY
export const updateFaqCategory = async (
  req,
  res
) => {
  try {
    if (req.body.name) {
      const newSlug = slugify(
        req.body.name
      );

      // CHECK EXISTING SLUG
      const existing =
        await faqCategoryModel.findOne({
          slug: newSlug,
          _id: { $ne: req.params.id },
        });

      if (existing) {
        return error(
          res,
          "Category already exists",
          400
        );
      }

      req.body.slug = newSlug;
    }

    const updated =
      await faqCategoryService.updateFaqCategory(
        req.params.id,
        req.body
      );

    if (!updated) {
      return error(
        res,
        "FAQ Category not found",
        404
      );
    }

    return success(
      res,
      updated,
      "Category updated successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
};

// DELETE CATEGORY
export const deleteFaqCategory = async (
  req,
  res
) => {
  try {
    const deleted =
      await faqCategoryService.deleteFaqCategory(
        req.params.id
      );

    if (!deleted) {
      return error(
        res,
        "FAQ Category not found",
        404
      );
    }

    return success(
      res,
      {},
      "Category deleted successfully"
    );
  } catch (err) {
    return error(res, err.message);
  }
};