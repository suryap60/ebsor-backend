import * as testimonialService from "../services/testimonial.service.js";
import { success, created, error } from "../utils/response.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// GET ALL
export const getTestimonials = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const result = await testimonialService.getAllTestimonials({
      page: Number(page),
      limit: Number(limit),
      search,
    });

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;

    const currentPage = Number(page);
    const totalPages = result.pagination.total_pages;

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
      result.testimonials,
      "Testimonials fetched successfully",
      pagination
    );
  } catch (err) {
    next(err);
  }
};

// GET BY ID
export const getTestimonialById = async (req, res, next) => {
  try {
    const testimonial = await testimonialService.getTestimonialById(req.params.id);

    if (!testimonial) {
      return error(res, "Testimonial not found", 404);
    }

    return success(res, testimonial);
  } catch (err) {
    next(err);
  }
};

// CREATE
export const createTestimonial = async (req, res, next) => {
  try {

    let image = "";

    // Upload image
    if (req.file) {
      const uploadFromBuffer = () => {
        return new Promise(
          (resolve, reject) => {
            const stream =
              cloudinary.uploader.upload_stream(
                {
                  folder: "testimonials",
                },

                (error, result) => {
                  if (result) {
                    resolve(result);
                  } else {
                    reject(error);
                  }
                }
              );

            streamifier
              .createReadStream(
                req.file.buffer
              )
              .pipe(stream);
          }
        );
      };

      const result =
        await uploadFromBuffer();

      image = result.secure_url;
    }

    const testimonial =
      await testimonialService.createTestimonial(
        {
          ...req.body,
          image,
        }
      );

    return created(
      res,
      testimonial,
      "Testimonial created successfully"
    );
  } catch (err) {
    next(err);
  }
};

// UPDATE
export const updateTestimonial = async (req, res, next) => {
  try {

    const { id } = req.params;

    let updateData = {
      ...req.body,
    };

    // Upload new image
    if (req.file) {
      const uploadFromBuffer = () => {
        return new Promise(
          (resolve, reject) => {
            const stream =
              cloudinary.uploader.upload_stream(
                {
                  folder: "testimonials",
                },

                (error, result) => {
                  if (result) {
                    resolve(result);
                  } else {
                    reject(error);
                  }
                }
              );

            streamifier
              .createReadStream(
                req.file.buffer
              )
              .pipe(stream);
          }
        );
      };

      const result =
        await uploadFromBuffer();

      updateData.image =
        result.secure_url;
    }

    const updated =
      await testimonialService.updateTestimonial(
        id,
        updateData
      );

    if (!updated) {
      return error(
        res,
        "Testimonial not found",
        404
      );
    }

    return success(res, updated, "Updated successfully");
  } catch (err) {
    next(err);
  }
};

// DELETE
export const deleteTestimonial = async (req, res, next) => {
  try {
    const deleted = await testimonialService.deleteTestimonial(req.params.id);

    if (!deleted) {
      return error(res, "Testimonial not found", 404);
    }

    return success(res, {}, "Deleted successfully");
  } catch (err) {
    next(err);
  }
};