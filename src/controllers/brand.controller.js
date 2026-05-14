import * as brandService from "../services/brand.service.js";
import Brand from "../models/brand.model.js";
import { success, created, error } from "../utils/response.js";
import { slugify } from "../utils/slugify.js";

import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { emitBrandCreated, emitBrandDeleted, emitBrandUpdated } from "../socket/socketEvents.js";


// GET ALL
export const getBrands = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await brandService.getAllBrands({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    return success(
      res,
      result.brands,
      "Brands fetched successfully",
      result.pagination
    );
  } catch (err) {
    next(err);
  }
};


// GET BY ID
export const getBrandById = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
      return error(res, "Brand not found", 404);
    }

    return success(res, brand);
  } catch (err) {
    next(err);
  }
};


// CREATE
export const createBrand = async (req, res, next) => {
  try {
    const { name, industry } = req.body;

    if (!name || !industry) {
      return error(res, "Name and Industry are required", 400);
    }

    const slug = slugify(name);

    const existing = await brandService.getBrandBySlug(slug);

    if (existing) {
      return error(res, "Brand already exists", 400);
    }

    let logo = "";

    // Upload Logo
    if (req.file) {
      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "brands",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier
            .createReadStream(req.file.buffer)
            .pipe(stream);
        });
      };

      const result = await uploadFromBuffer();

      logo = result.secure_url;
    }

    const brand = await brandService.createBrand({
      name,
      industry,
      slug,
      logo,
    });

    emitBrandCreated(brand);

    return created(res, brand, "Brand created successfully");
  } catch (err) {
    next(err);
  }
};


// UPDATE
export const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    let updateData = {
      ...req.body,
    };

    if (req.body.name) {
      updateData.slug = slugify(req.body.name);
    }

    // Upload new logo
    if (req.file) {
      const uploadFromBuffer = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "brands",
            },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier
            .createReadStream(req.file.buffer)
            .pipe(stream);
        });
      };

      const result = await uploadFromBuffer();

      updateData.logo = result.secure_url;
    }

    const updated = await brandService.updateBrand(id, updateData);

    emitBrandUpdated(updated);

    if (!updated) {
      return error(res, "Brand not found", 404);
    }

    return success(res, updated, "Brand updated successfully");
  } catch (err) {
    next(err);
  }
};


// DELETE
export const deleteBrand = async (req, res, next) => {
  try {
    const deleted = await brandService.deleteBrand(req.params.id);

    emitBrandDeleted(req.params.id);

    if (!deleted) {
      return error(res, "Brand not found", 404);
    }

    return success(res, {}, "Brand deleted successfully");
  } catch (err) {
    next(err);
  }
};